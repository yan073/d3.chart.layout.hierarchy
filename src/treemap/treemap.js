
d3.chart("hierarchy").extend("treemap", {
 
  initialize : function() {

    var chart = this;

    chart.d3.layout = d3.layout.treemap();

    chart._width  = chart.base.attr("width");
    chart._height = chart.base.attr("height");

    chart.layer("base", chart.layers.base, {

      dataBind: function(data) {
        return this.selectAll(".cell").data(data);
      },

      insert: function() {
        return this.append("g").classed("cell", true);
      },

      events: {
        "enter": function() {

          this.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
          
          this.append("rect")
            .attr("width", function(d) { return d.dx; })
            .attr("height", function(d) { return d.dy; })
            .attr("fill", function(d) { return d.parent ? chart.d3.colorScale(d.parent[chart._name]) : null; });

          this.append("text")
            .attr("x", function(d) { return d.dx / 2; })
            .attr("y", function(d) { return d.dy / 2; })
            .attr("dy", ".35em")
            .text(function(d) { return d.children ? null : d[chart._name]; }) // order is matter! getComputedTextLength
            .style("opacity", function(d) { d.w = this.getComputedTextLength(); return d.dx > d.w ? 1 : 0; });

          this.on("click", function(event) {
            chart.trigger("rect:click", event);
          });
        },
      }
    });
  },


  transform: function(root) {
    var chart  = this;

    chart.root = root;

    return chart.d3.layout
      .round(false)
      .size([chart._width, chart._height])
      .sticky(true)
      .nodes(root);
  },


  collapsible: function() {
    var chart = this;

    var node,
        x = d3.scale.linear().range([0, chart._width]),
        y = d3.scale.linear().range([0, chart._height]);

    chart.layers.base.on("merge", function() {
      node = chart.root;
      chart.on("rect:click", function(d) { collapse(node == d.parent ? chart.root : d.parent); });
    });

    function collapse(d) {
      var kx = chart._width  / d.dx,
          ky = chart._height / d.dy;

      x.domain([d.x, d.x + d.dx]);
      y.domain([d.y, d.y + d.dy]);

      var t = chart.layers.base.transition()
        .duration(chart._duration);

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


