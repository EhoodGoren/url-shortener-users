// function errorHandler(err, req, res, next){
//     if(!err) return
//     switch (err) {
//         case '404':
//             res.status(404).json({message: "Page not found"});
//             break;
//         default:
//             res.status(500).json({message: "Server Error"})
//             break;
//     }
//     res.send();
//     next();
// }
function errorHandler(err, req, res, next){
    console.log(err);
    if(err.status){
        res.status(err.status).send({error: err.message});
        return;
    }
    else{
        res.status(500).send({error: 'Server error'});
        return;
    }
}

module.exports = errorHandler;
