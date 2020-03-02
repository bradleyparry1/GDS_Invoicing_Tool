function processData(d,dict){
    var parse = JSON.parse(d);
    console.log(parse);
    dict.setLoading(false);
}

export default processData;