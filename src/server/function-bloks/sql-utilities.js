// const {emitter} = require('../server');

module.exports.recipeInit = async function recipeInit (sql, socket, recipe_id) {
    sql.query(`SELECT * FROM recipes WHERE id = ${recipe_id};`).then(
        (results) => {
            const send = results[0][0];
            sql.query(`SELECT COUNT(*) AS count FROM recipes;`).then(
                (results) => {
                    send.amount = results[0][0].count;
                    sql.query(`SELECT ROW_NUMBER() OVER(ORDER BY id) n, id FROM recipes;`).then(
                        (results) => {
                            results[0].forEach(function(item, i, arr) {
                                if (item.id === recipe_id) {send.current = item.n;}
                            });
                            if (typeof(send.recipe_data) === "string") {
                              send.recipe_data = JSON.parse(send.recipe_data);
                            }
                            socket.emit("recipe_init", send);
                            // console.log(send);
                            if (send.recipe_data && send.recipe_data.heat_setting_arr) {
                              global.memory.recipe.data.heat_setting_arr = send.recipe_data.heat_setting_arr
                            } else {
                              global.memory.recipe.data.heat_setting_arr = [[0,0]]
                            }
                        }
                    )
                }
            )
        }
    ).catch(
        (e) => {console.log(e)}
    )
};

module.exports.recipeDelete = function recipeDelete(sql, socket, recipeInit) {
    sql.query(`SELECT COUNT(*) AS count FROM recipes;`).then(
        (results) => {
            if (results[0][0].count > 1) {
                sql.query("SELECT current_recipe FROM service;").then(
                    (results) => {
                        const delete_recipe = results[0][0]['current_recipe'];
                        sql.query(`SELECT ROW_NUMBER() OVER(ORDER BY id) n, id FROM recipes;`).then(
                            (results) => {
                                let new_id = null;
                                results[0].forEach(function (item, i, arr) {
                                    if (item.id === delete_recipe) {
                                        if (item.n === results[0].length) {
                                            new_id = arr[i-1].id;
                                        } else {
                                            new_id = arr[i+1].id;
                                        }
                                        sql.query(`DELETE FROM recipes WHERE id = ${delete_recipe};`);
                                        sql.query(`UPDATE service SET current_recipe = ${new_id};`);
                                        recipeInit(sql, socket, new_id)
                                    }
                                });
                            }
                        )
                    }
                )
            }
        }
    )
};

module.exports.recipeChange = function recipeChange (sql, socket, recipe_num, recipeInit) {
        sql.query(`SELECT ROW_NUMBER() OVER(ORDER BY id) n, id FROM recipes;`).then(
            (results) => {
                results[0].forEach(function(item, i, arr) {
                    if (item.n === recipe_num) {
                        sql.query(`UPDATE service SET current_recipe = ${item.id};`);
                        recipeInit(sql, socket, item.id)
                    }
                })
            }
        )
};