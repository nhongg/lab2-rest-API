const express=require('express');
const mongoose=require('mongoose');

const app=express();

mongoose.connect('mongodb+srv://anhntkph42900:1234566@cluster0.tfolv4x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
useNewUrlParser:true,
useUnifiedTopology:true
}).then(()=>{
    console.log("ketnoithanhcong");
}).catch((err)=>{
    console.error("loi",err)
});

const db1=mongoose.connection.useDb('db1');

const SinhVienSchema=new mongoose.Schema({
    masv:String,
    tensv:String,

});
const SinhVien=db1.model("sinhvien",SinhVienSchema);
app.get('/',async(req,res)=>{
    try{
        const sinhvien= await SinhVien.find();
        if(sinhvien.length>0){
            res.json(sinhvien);
        }else{
            res.status(404).json({err:"khong co sinh vien"});
        }
    }catch(error){
        console.error("loi doc du lieu: ");
        res.status(500).json({error:"Doc loi du lieu"});
    }
});
const PORT=process.env.PORT|| 5000;
app.listen(PORT,()=>{
    console.log("sever dang chay o cong 5000")
});
module.exports=app;