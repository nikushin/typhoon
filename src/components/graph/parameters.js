const Width = 900;
const Xstart = - 60;
const Ystart = -25;

const GraphVirtualWidth = 960;
const GraphVirtualHeight = 400;
const GraphHeight = 500;
const GraphBorderLeft = 50;
const GraphBorderRight = 50;
const GraphBorderTop = 25;
const GraphBorderBottom = 25;

const GraphWidthInner = Width-GraphBorderLeft-GraphBorderRight;
const GraphHeightInner = GraphHeight-GraphBorderTop-GraphBorderBottom;
const Xkoef = GraphWidthInner/GraphVirtualWidth;
const GraphYkoef = GraphHeightInner/GraphVirtualHeight;

const PowerHeight = 120;
const PowerVirtualHeight = 100;
const PowerIndent = 10;
const PowerBorderRight = GraphBorderRight + PowerIndent/2;
const PowerBorderTop = 15;
const PowerBorderBottom = 35;
const PowerBorderLeft = GraphBorderLeft + (60*Xkoef) - PowerIndent/2;
const PowerWidthInner = Width-PowerBorderLeft-PowerBorderRight+PowerIndent;
const PowerHeightInner = PowerHeight-PowerBorderTop-PowerBorderBottom+PowerIndent;
const PowerWidthWorkPlot = Width-PowerBorderLeft-PowerBorderRight;
const PowerHeightWorkPlot = PowerHeight-PowerBorderTop-PowerBorderBottom;
const PowerYkoef = (PowerHeightWorkPlot)/PowerVirtualHeight;
// const PowerYkoefText = (PowerHeight-PowerBorderTop-PowerBorderBottom)/PowerVirtualHeight;

export default {
  Width: Width,
  Xstart:Xstart,
  Ystart: Ystart,

  GraphVirtualWidth: GraphVirtualWidth,
  GraphVirtualHeight: GraphVirtualHeight,
  GraphHeight: GraphHeight,
  GraphBorderLeft: GraphBorderLeft,
  GraphBorderRight: GraphBorderRight,
  GraphBorderTop: GraphBorderTop,
  GraphBorderBottom: GraphBorderBottom,
  GraphWidthInner: GraphWidthInner,
  GraphHeightInner: GraphHeightInner,
  Xkoef: Xkoef,
  GraphYkoef: GraphYkoef,

  PowerHeight: PowerHeight,
  PowerVirtualHeight: PowerVirtualHeight,
  PowerIndent: PowerIndent,
  PowerBorderRight: PowerBorderRight,
  PowerBorderTop: PowerBorderTop,
  PowerBorderBottom: PowerBorderBottom,
  PowerBorderLeft: PowerBorderLeft,
  PowerWidthInner: PowerWidthInner,
  PowerHeightInner: PowerHeightInner,
  PowerWidthWorkPlot: PowerWidthWorkPlot,
  PowerHeightWorkPlot: PowerHeightWorkPlot,
  PowerYkoef: PowerYkoef,
  // PowerYkoefText: PowerYkoefText,
}
