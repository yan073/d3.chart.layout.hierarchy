
# d3.chart.layout **v0.1.1**

Collection of reusable d3.layouts built with [d3.chart](http://misoproject.com/d3-chart/) framework.

## d3.chart.layout.hierarchy


  - [Cluster](#cluster)
  - [Pack](#pack)
  - [Partition](#partition)
  - [Tree](#tree)
  - [Treemap](#treemap)


The input data is a vertex-labeled graph:

```javascript
{ "name": "Root",
  "children": [
    { "name": "Leaf 1", "value": 3 }, 
    { "name": "Node 1",
      "children": [
        { "name": "Leaf 2", "value": 6 }, 
        { "name": "Node 2",
          "children": [
            { "name": "Leaf 3", "value": 2 }, 
            { "name": "Leaf 4", "value": 8 }
          ]
        }
      ]
    }
  ]
}
```


## Cluster

View [cartesian cluster demo](http://bl.ocks.org/bansaghi/ffc9d995f77e9ccd4ea9) and [radial cluster demo](http://bl.ocks.org/bansaghi/e490c7c238a67a77996d)

#### Sample Use

```javascript
var cluster = d3.select("#vis")
  .append("svg")
  .chart("cluster.cartesian")
    .value("size")
    .margin({ top: 0, right: 60, bottom: 0, left: 60 })
    .radius(3)
    .zoomable([0.1, 3])
    .collapsible()
    .duration(200);

cluster.draw(data);
```

```javascript
var cluster = d3.select("#vis")
  .append("svg")
  .chart("cluster.radial")
    .value("size")
    .diameter(350)
    .radius(3)
    .zoomable([0.1, 3])
    .collapsible()
    .duration(200);

cluster.draw(data);
```



#### API

&lt;instance&gt;.<b>name</b>([<i>name</i>]) - get or set the textual content of a node.

&lt;instance&gt;.<b>value</b>([<i>value</i>]) - get or set the numerical value of a node.

[&lt;instance&gt;.<b>duration</b>([<i>duration</i>])](https://github.com/mbostock/d3/wiki/Transitions#duration) - specify per-element duration in milliseconds.

[&lt;instance&gt;.<b>radius</b>([<i>length</i>])](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/r) - specify the node radius.

&lt;instance&gt;.<b>collapsible</b>() - apply the collapse behavior to the graph.

[&lt;instance&gt;.<b>zoomable</b>([<i>scaleExtent</i>])](https://github.com/mbostock/d3/wiki/Zoom-Behavior) - apply the zoom behavior with two-element array for the range.


[&lt;instance.cartesian&gt;.<b>margin</b>([<i>values</i>])](http://bl.ocks.org/mbostock/3019563) - get or set the margin object with properties for the four sides.

&lt;instance.radial&gt;.<b>diameter</b>([<i>value</i>]) - get or set the diameter of the graph.


## Pack

View [nested pack demo](http://bl.ocks.org/bansaghi/4b542562da43e1ae3e40) and [flattened pack demo](http://bl.ocks.org/bansaghi/7588173d69ec85451ee2)


#### Sample Use

```javascript
var pack = d3.select("#vis")
  .append("svg")
  .chart("pack.nested")
    .value("size")
    .diameter(350)
    .zoomable([0.1, 3])
    .collapsible()
    .duration(200);

pack.draw(data);
```

```javascript
function classes(root) {...};
function title(d) {...};
function fill(d) {...};

var pack = d3.select("#vis")
  .append("svg")
  .chart("pack.flattened")
    .name("className")
    .flatten(classes)
    .formats({ title: title, fill: fill })
    .diameter(350)
    .zoomable([0.1, 3])
    .duration(200);

pack.draw(data);
```

#### API

&lt;instance&gt;.<b>name</b>([<i>name</i>]) - get or set the textual content of a node.

&lt;instance&gt;.<b>value</b>([<i>value</i>]) - get or set the numerical value of a node.

[&lt;instance&gt;.<b>duration</b>([<i>duration</i>])](https://github.com/mbostock/d3/wiki/Transitions#duration) - specify per-element duration in milliseconds.

&lt;instance&gt;.<b>diameter</b>([<i>value</i>]) - get or set the diameter of the graph.

[&lt;instance&gt;.<b>zoomable</b>([<i>scaleExtent</i>])](https://github.com/mbostock/d3/wiki/Zoom-Behavior) - apply the zoom behavior with two-element array for the range.


&lt;instance.nested&gt;.<b>collapsible</b>() - apply the collapse behavior to the graph.

&lt;instance.flattened&gt;.<b>flatten</b>([<i>function</i>]) - specify the hierarchy flattening function.

&lt;instance.flattened&gt;.<b>formats</b>([<i>formats</i>]) - get or set the formats object with properties for the formatting functions.




## Partition

View [arc partitiion demo](http://bl.ocks.org/bansaghi/2617fed0c286365c7f49) and [rectangle partition demo](http://bl.ocks.org/bansaghi/4fde0154055c0f0580b7)

#### Sample Use

```javascript
var partition = d3.select("#vis")
  .append("svg")
  .chart("partition.arc")
    .value("size")
    .diameter(350)
    .zoomable([0.1, 3])
    .collapsible()
    .duration(200);

partition.draw(data);
```

```javascript
var partition = d3.select("#vis")
  .append("svg")
  .chart("partition.rectangle")
    .value("size")
    .zoomable([0.1, 3])
    .collapsible()
    .duration(200);

partition.draw(data);
```


#### API

&lt;instance&gt;.<b>name</b>([<i>name</i>]) - get or set the textual content of a node.

&lt;instance&gt;.<b>value</b>([<i>value</i>]) - get or set the numerical value of a node.

[&lt;instance&gt;.<b>duration</b>([<i>duration</i>])](https://github.com/mbostock/d3/wiki/Transitions#duration) - specify per-element duration in milliseconds.

&lt;instance&gt;.<b>collapsible</b>() - apply the collapse behavior to the graph.

[&lt;instance&gt;.<b>zoomable</b>([<i>scaleExtent</i>])](https://github.com/mbostock/d3/wiki/Zoom-Behavior) - apply the zoom behavior with two-element array for the range.


&lt;instance.arc&gt;.<b>diameter</b>([<i>value</i>]) - get or set the diameter of the graph.




## Tree

View [cartesian tree demo](http://bl.ocks.org/bansaghi/b0e74b395d1909657ded) and [radial tree demo](http://bl.ocks.org/bansaghi/f3cbb5e7b759b6a58aff)

#### Sample Use

```javascript
var tree = d3.select("#vis")
  .append("svg")
  .chart("tree.cartesian")
    .value("size")
    .margin({ top: 0, right: 60, bottom: 0, left: 60 })
    .radius(3)
    .zoomable([0.1, 3])
    .collapsible()
    .duration(200);

tree.draw(data);
```

```javascript
var tree = d3.select("#vis")
  .append("svg")
  .chart("tree.radial")
    .value("size")
    .diameter(350)
    .radius(3)
    .zoomable([0.1, 3])
    .collapsible()
    .duration(200);

tree.draw(data);
```



#### API

&lt;instance&gt;.<b>name</b>([<i>name</i>]) - get or set the textual content of a node.

&lt;instance&gt;.<b>value</b>([<i>value</i>]) - get or set the numerical value of a node.

[&lt;instance&gt;.<b>duration</b>([<i>duration</i>])](https://github.com/mbostock/d3/wiki/Transitions#duration) - specify per-element duration in milliseconds.

[&lt;instance&gt;.<b>radius</b>([<i>length</i>])](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/r) - specify the node radius.

&lt;instance&gt;.<b>collapsible</b>() - apply the collapse behavior to the graph.

[&lt;instance&gt;.<b>zoomable</b>([<i>scaleExtent</i>])](https://github.com/mbostock/d3/wiki/Zoom-Behavior) - apply the zoom behavior with two-element array for the range.


[&lt;instance.cartesian&gt;.<b>margin</b>([<i>values</i>])](http://bl.ocks.org/mbostock/3019563) - get or set the margin object with properties for the four sides.

&lt;instance.radial&gt;.<b>diameter</b>([<i>value</i>]) - get or set the diameter of the graph.



## Treemap

View [treemap demo](http://bl.ocks.org/bansaghi/5d24b37ebe077d4e919f)

#### Sample Use

```javascript
var treemap = d3.select("#vis")
  .append("svg")
  .chart("treemap")
    .value("size")
    .zoomable([0.1, 3])
    .collapsible()
    .duration(200);

treemap.draw(data);
```


#### API

&lt;instance&gt;.<b>name</b>([<i>name</i>]) - get or set the textual content of a node.

&lt;instance&gt;.<b>value</b>([<i>value</i>]) - get or set the numerical value of a node.

[&lt;instance&gt;.<b>duration</b>([<i>duration</i>])](https://github.com/mbostock/d3/wiki/Transitions#duration) - specify per-element duration in milliseconds.

&lt;instance&gt;.<b>collapsible</b>() - apply the collapse behavior to the graph.

[&lt;instance&gt;.<b>zoomable</b>([<i>scaleExtent</i>])](https://github.com/mbostock/d3/wiki/Zoom-Behavior) - apply the zoom behavior with two-element array for the range.

