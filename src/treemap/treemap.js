
d3.chart("hierarchy").extend("treemap", {
 
  initialize : function() {
    var chart = this;
    var colordef = d3.select(".abcdef");
    console.log(colordef);
    var defc1 = colordef[0]['color'];
    console.log(defc1);
    var defc2 = colordef['color'];
    console.log(defc2);
    chart.extColor = {}
    chart.extColorCount = 3;
    var colorPalette = [
        ['#0090D8','#00AAFF','#59C8FF'],
        ['#FF585B','#D90004','#FF0004'],
        ['#FFFFB2','#FFFF00','#D8D800'],
        ['#00FFD3','#61D4B4','#B2FFF2'],
        ['#D5D5D5','#A7A7A7','#F2F2F2']
        ];
    if (typeof cathCategoryColours !== 'undefined') {
      colorPalette = cathCategoryColours;
    }
    chart.extColor['1'] =  d3.scale.ordinal().range( colorPalette[0] );
    chart.extColor['2'] =  d3.scale.ordinal().range( colorPalette[1] );
    chart.extColor['3'] =  d3.scale.ordinal().range( colorPalette[2] );
    chart.extColor['4'] =  d3.scale.ordinal().range( colorPalette[3] );
    chart.extColor['u'] =  d3.scale.ordinal().range( colorPalette[4] );
    
    chart.d3.layout = d3.layout.treemap();

    chart.layer("base", chart.layers.base, {

      dataBind: function(nodes) {
        return this.selectAll(".cell").data(nodes);
      },

      insert: function() {
        return this.append("g").classed("cell", true);
      },

      events: {
        "enter": function() {
          this.classed( "leaf", function(d) { return d.isLeaf; });

          this.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
          
          this.append("rect")
            .attr("width", function(d) { return d.dx; })
            .attr("height", function(d) { return d.dy; })
            .attr("fill", function(d) { return chart.getColour(d); });

          this.append("text")
            .attr("x", function(d) { return d.dx / 2; })
            .attr("y", function(d) { return d.dy / 2; })
            .attr("dy", ".35em")
            .text(function(d) { return d.children ? null : d[chart.options.name]; }) // order is matter! getComputedTextLength
            .style("opacity", function(d) { d.w = this.getComputedTextLength(); return d.dx > d.w ? 1 : 0; });

          this.on("click", function(event) { chart.trigger("click:rect", event); });
        },
      }
    });
  },

  getColour: function(d) { 
    var cat = d.isLeaf ? d.parent.name.charAt(0) : null;//'1', '2', '3', '4', 'u'
    return cat ? this.extColor[cat](Math.floor(Math.random() * this.extColorCount )) : null;
  },

  transform: function(root) {
    var chart  = this;

    chart.root = root;

    return chart.d3.layout
      .round(false)
      .size([chart.options.width, chart.options.height])
      .sticky(true)
      .nodes(root);
  },


  collapsible: function() {
    var chart = this;

    var node,
        x = d3.scale.linear().range([0, chart.options.width]),
        y = d3.scale.linear().range([0, chart.options.height]);

    chart.layers.base.on("merge", function() {
      node = chart.root;
      chart.off("click:rect").on("click:rect", function(d) { collapse(node == d.parent ? chart.root : d.parent); });
    });

    function collapse(d) {
      var kx = chart.options.width  / d.dx,
          ky = chart.options.height / d.dy;

      x.domain([d.x, d.x + d.dx]);
      y.domain([d.y, d.y + d.dy]);

      var t = chart.layers.base.transition()
        .duration(chart.options.duration);

      t.selectAll(".cell")
        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

      t.selectAll("rect")
        .attr("width",  function(d) { return kx * d.dx; })
        .attr("height", function(d) { return ky * d.dy; });

      t.selectAll("text")
        .attr("x", function(d) { return kx * d.dx / 2; })
        .attr("y", function(d) { return ky * d.dy / 2; })
        .style("opacity", function(d) { return kx * d.dx > d.w ? 1 : 0; });

      node = d;
    }

    return chart;
  },
});


