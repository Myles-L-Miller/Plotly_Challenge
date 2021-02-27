function buildpage(id){
console.log(id)
d3.json("samples.json").then((data)=>{
var results=data.samples.filter(obj=>obj.id==id)[0]
console.log(results)
var bardata=[{
    x:results.sample_values.slice(0,10).reverse(),
    y:results.otu_ids.slice(0,10).map(O=>"OTU "+O).reverse(),
    text:results.otu_labels.slice(0,10).reverse(),
    type:"bar",
    orientation:"h",
}]
var barlayout={
    Title:"Top-10 Bacteria Cultures Found"
}
Plotly.newPlot("bar", bardata, barlayout)
var bubbledata=[{
    x:results.otu_ids,
    y:results.sample_values,
    text:results.otu_labels,
    mode:"markers",
    marker:{
        size:results.sample_values,
        color:results.otu_ids,
    }
}]
var bubblelayout={
    Title: "Bacteria Cultures per Sample"
}
Plotly.newPlot("bubble", bubbledata, bubblelayout)

var metadata=data.metadata.filter(obj=>obj.id==id)[0]
var paneldata=d3.select("#sample-metadata")
paneldata.html("")
Object.entries(metadata).forEach(([key,value])=>{
console.log(key)
paneldata.append("h5").text(key+": " +value)
})
})
}
function optionChanged(idvalue){
   buildpage(idvalue) 
}

d3.json("samples.json").then((data)=>{
console.log(data)
data.names.forEach((name)=>{ 
var selection=d3.select("#selDataset")
selection.append("option").text(name).property("value", name)
      
});
buildpage(data.names[0])
})