const router = require("express").Router();
const { User } = require("../models/user");

router.put("/", async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.age= req.body.age ||user.age;
        user.gender= req.body.gender ||user.gender;
        user.dob= req.body.dob ||user.dob;
        user.mobile= req.body.mobile ||user.mobile;

        // if(req.body.password){
        //     user.password = req.body.password || user.password;
        //     user.confirmPassword = req.body.confirmPassword || user.confirmPassword;
        // }
        // const salt = await bcrypt.genSalt(Number(process.env.SALT));
		// const hashPassword = await bcrypt.hash(user.password, salt);
		// const hashConfirmPassword = await bcrypt.hash(user.confirmPassword, salt);
		// if (user.password!==user.confirmPassword)
		// return res
		// 	.status(409)
		// 	.send({ message: "Password and Confirm Password doesn't Match" });
		// // else
		// // {
		// // 	const updatedUser = await user({ ...user.body, password: hashPassword, confirmPassword: hashConfirmPassword  }).save();
		// // 	res.status(201).send({ message: "User created successfully" });
		// // }
        const updatedUser = await user.save();

        // res.json({
        //     name: updatedUser.name,
        //     email: updatedUser.email,
        //     age:updatedUser.age,
        //     gender:updatedUser.gender,
        //     dob:updatedUser.dob,
	    //     mobile:updatedUser.mobile,
        //     // token: generateToken(user._id)
        // })
        res.status(201).send({ message: "User Updated successfully" });
    } else {
        res.status(404)
        throw new Error('User not found')
    }
});



module.exports = router;