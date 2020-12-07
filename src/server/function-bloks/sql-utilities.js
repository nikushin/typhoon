const {emitter} = require('../server');

module.exports.recipeInit = function recipeInit (sql, socket, recipe_id) {
  sql.query(`SELECT * FROM recipes WHERE id = ${recipe_id};`,
    function(err, results) {
      const send = results[0];
      sql.query(`SELECT COUNT(*) AS count FROM recipes;`,
        function(err, results) {
          send.amount = results[0].count;
          sql.query(`SELECT ROW_NUMBER() OVER(ORDER BY id) n, id
                      FROM recipes;`,
            function(err, results) {
              results.forEach(function(item, i, arr) {
                if (item.id === recipe_id) {send.current = item.n;}
              });
              socket.emit("recipe_init", send);
            });
        });
    });
};

module.exports.recipeDelete = function recipeDelete(sql, socket, recipeInit) {
  sql.query(`SELECT COUNT(*) AS count FROM recipes;`,
    function (err, results) {
      if (results[0].count > 1) {
        sql.query("SELECT current_recipe FROM service;",
          function(err, results) {
          const delete_recipe = results[0]['current_recipe'];
            sql.query(`SELECT ROW_NUMBER() OVER(ORDER BY id) n, id FROM recipes;`,
              function (err, results) {
                let new_id = null;
                results.forEach(function (item, i, arr) {
                  if (item.id === delete_recipe) {
                    if (item.n === results.length) {
                      new_id = arr[i-1].id
                    } else {
                      new_id = arr[i+1].id
                    }
                    sql.query(`DELETE FROM recipes
                    WHERE id = ${delete_recipe};`);

                    sql.query(`UPDATE service
                    SET current_recipe = ${new_id};`);
                    recipeInit(sql, socket, new_id)
                  }
                });
              });

          })
      }
    });
};

module.exports.recipeChange = function recipeChange (sql, socket, recipe_num, recipeInit) {
  sql.query(`SELECT ROW_NUMBER() OVER(ORDER BY id) n, id
              FROM recipes;`,
    function(err, results) {
      results.forEach(function(item, i, arr) {
        if (item.n === recipe_num) {
          sql.query(`UPDATE service 
          SET current_recipe = ${item.id};`);
          recipeInit(sql, socket, item.id)
        }
      });
    });
};
