(function (d3) {
  'use strict';

  d3.chart("cluster-tree.cartesian").extend("tree.cartesian", {

    initialize: function () {
      this.d3.layout = d3.layout.tree();
    },

  });

})(d3);
