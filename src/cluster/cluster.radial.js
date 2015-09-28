(function (d3) {
  'use strict';

  d3.chart("cluster-tree.radial").extend("cluster.radial", {

    initialize: function () {
      this.d3.layout = d3.layout.cluster();
    },

  });

})(d3);
