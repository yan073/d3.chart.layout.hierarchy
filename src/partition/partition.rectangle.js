(function (d3) {
  'use strict';

  d3.chart("hierarchy").extend("partition.rectangle", {

    initialize : function() {

      var chart = this;

      chart.d3.layout = d3.layout.partition();

      var x = d3.scale.linear().range([0, chart.features.width]),
          y = d3.scale.linear().range([0, chart.features.height]);

      chart.d3.transform = function(d, ky) { return "translate(8," + d.dx * ky / 2 + ")"; };


      chart.layer("base", chart.layers.base, {

        dataBind: function(nodes) {
          return this.selectAll(".partition").data(nodes);
        },

        insert: function() {
          return this.append("g").classed("partition", true);
        },

        events: {
          "enter": function() {

            chart._initNode(this);

            this.attr("transform", function(d) { return "translate(" + x(d.y) + "," + y(d.x) + ")"; });

            var kx = chart.features.width  / chart.root.dx,
                ky = chart.features.height / 1;

            this.append("rect")
              .attr("width", chart.root.dy * kx)
              .attr("height", function(d) { return d.dx * ky; });

            this.append("text")
              .attr("transform", function(d) { return chart.d3.transform(d, ky); })
              .attr("dy", ".35em")
              .style("opacity", function(d) { return d.dx * ky > 12 ? 1 : 0; })
              .text(function(d) { return d[chart.features.name]; });

            this.on("click", function(event) {
              chart.trigger("rect:click", event);
            });
          }
        }
      });
    },



    transform: function(root) {
      var chart = this;

      chart.root = root;

      return chart.d3.layout.nodes(root);
    },


    collapsible: function() {
      var chart = this;

      var node,
          x = d3.scale.linear(),
          y = d3.scale.linear().range([0, chart.features.height]);

      chart.layers.base.on("merge", function() {
        node = chart.root;
        chart.on("rect:click", function(d) { collapse(node == d ? chart.root : d); });
      });

      function collapse(d) {
        var kx = (d.y ? chart.features.width - 40 : chart.features.width) / (1 - d.y),
            ky = chart.features.height / d.dx;

        x.domain([d.y, 1]).range([d.y ? 40 : 0, chart.features.width]);
        y.domain([d.x, d.x + d.dx]);

        var t = chart.layers.base.transition()
          .duration(chart.features.duration);

        t.selectAll(".partition")
          .attr("transform", function(d) { return "translate(" + x(d.y) + "," + y(d.x) + ")"; });

        t.selectAll("rect")
          .attr("width", d.dy * kx)
          .attr("height", function(d) { return d.dx * ky; });

        t.selectAll("text")
          .attr("transform", function(d) { return chart.d3.transform(d, ky); })
          .style("opacity",  function(d) { return d.dx * ky > 12 ? 1 : 0; });

        node = d;
      }

      return chart;
    },
  });

})(d3);
