
d3.chart("hierarchy").extend("treemap", {
 
  initialize : function() {
    var chart = this;
    var colordef = d3.select(".abcdef");
    console.log(colordef);
    var defc1 = colordef[0]['color'];
    console.log(defc1);
    var defc2 = colordef['color'];
    console.log(defc2);
    chart.extColorCount = 3;
    
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
          //this.classed( "leaf", function(d) { return d.isLeaf; });
          this.attr("class", function(d) { 
            var classvar = "cell";
            if (d.isLeaf){ 
              classvar = classvar + " leaf " + chart.getLeafClass(d);
            }
            return classvar; });

          this.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
          this.attr("data-tippy-content", d => d.isLeaf ? chart.getLeafContent(d) : null);
          
          this.append("rect")
            .attr("width", function(d) { return d.dx; })
            .attr("height", function(d) { return d.dy; });

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

  getLeafContent : function(d) { 
    let cath = d.parent.name;
    let cat = cath.charAt(0);//'1', '2', '3', '4', 'u'
    var content = '<a href="https://aquaria.app/' + d.name + '">'+d.name+'</a>';
    if (cat != 'u') {
      content = content + ', <a href="http://www.cathdb.info/version/latest/superfamily/' + cath + '/classification" >' + cath +'</a>';
    }
    return content;
    //return content.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");;
  },

  getLeafClass : function(d) { 
    let cat = d.parent.name.charAt(0);//'1', '2', '3', '4', 'u'
    if (cat != null) {
      var categoryName = d.name;
      if (cat != 'u') {
        categoryName = d.parent.name;
        if (categoryName.length > 2) {
          let index = categoryName.indexOf('.', 2);
          if(index > 0) {
            categoryName = categoryName.substring(0, index);
          }
        }
      }
      return "leafc" + cat + "_" + this.stringToIntHash(categoryName, this.extColorCount+1, 1);
    }
    return "";
  },

  stringToIntHash: function(str, upperbound, lowerbound) {
    let result = 0;
    for (let i = 0; i < str.length; i++) {
      result = result + str.charCodeAt(i);
    }  
    return (result % (upperbound - lowerbound)) + lowerbound;
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


