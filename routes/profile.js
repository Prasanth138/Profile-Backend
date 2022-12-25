const router = require("express").Router();
const { User } = require("../models/user");

router.post("/", async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
		if(user){
			// res.json({
			// 	_id: user._id,
			// 	name: user.name,
			// 	email: user.email,
            //     password:user.password,
	        //     confirmPassword:user.confirmPassword,
	        //     age:user.age,
            //     gender:user.gender,
            //     dob:user.dob,
	        //     mobile:user.mobile,
			// })
			res.status(201).send(user);
		} else {
			res.status(404)
			throw new Error('User not found')
		}
		
});



module.exports = router;