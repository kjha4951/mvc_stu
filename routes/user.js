const express=require("express");
const router=express.Router();

router.get("/users",async(req,res)=>{
  const allDbUsers=await User.find({});
  const html=`
  <ul>
  ${allDbUsers
    .map((user)=>`<li>${user.firstname} - ${user.email}</li>`)
}
  </ul>
  `; 
  res.send(html);
});

router.get("/api/users",async(req,res)=>{
  const allDbUsers=await User.find({});
  return res.json(allDbUsers);  
});


router
.route("/api/users/:id")
.get(async(req,res)=>{
    const user =await User.findById(req.param.id);
    if(!user) return res.status(404).json({error:"user not found"});
    return res.json(user);
})

.patch(async (req,res)=>{
    await User.findByIdAndUpdate(req.param.id,{lastname: "Changed"});
    return res.json({status:"Success"});
})
.delete(async (req,res)=>{
    await User.findByIdAndDelete(req.param.id);
    return res.json({status:"Success"});
});


router.post("/api/users",async(req,res)=>{
    const body=req.body;
    if(
       !body ||
       !body.firstname ||
       !body.lastname ||
       !body.email ||
       !body.gender||
       !body.job_title 
    ){
        return res.status(400).json({msg: "all fields are req..."});

    }

    const result = await User.create({
        firstname:body.firstname,
    
    })
});


