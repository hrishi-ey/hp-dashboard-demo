import { useEffect, useState } from "react";
import { useFormik } from "formik"
import { loginSchema } from "../schemas/index"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Icon from "../components/atom/Icon"
import { loginUser } from "../store/UserSlice"
import hpLogo from "../assets/img/cont/henny-penny-logo.svg";
import { useAuth } from "../components/AuthProvider";

const Login = () => {

	const navigate = useNavigate();
	const user = useAuth();
		
	useEffect(() => {
		if(user.isLoggedIn) {
			navigate("/dashboard", {replace: true});
		}
	}, [user]);
	
	const [showPassword, setShowPassword] = useState(false);
	const [isError, setIsError] = useState(null);
  	const dispatch = useDispatch();

	// Admin user
  	const initialValues = {
		email: "hrishikesh.joshi1@in.ey.com",
		password: "SItMlghy2hs="
	};

	// Owner Operator
  	// const initialValues = {
	// 	email: "hrishi.hennypenny@gmail.com",
	// 	password: "HP-Hrishi@85"
	// };

	// Store Manager
  	// const initialValues = {
	// 	email: "hrishi2.hennypenny@gmail.com",
	// 	password: "HP-Hrishi@85"
	// };

	// no values
	// const initialValues = {
	// 	email: "",
	// 	password: ""
	// };

  	const {values, isSubmitting, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
		initialValues: initialValues,
		validationSchema: loginSchema,
		onSubmit : (values, action) => {
			// here I can call login method from a reducer
			dispatch(loginUser(values)).then((result) => {
				if(result.error) {
					setIsError(result.error.message);
				}
				if(result.payload) {
					action.resetForm();
					navigate("/dashboard", {replace: true});
				}
			});
		}
	});

	const handleShowHidePassword = () => {
		setShowPassword(!showPassword);
	};
  
  return <>
    <div className="w-full h-[100vh] flex items-center justify-center">
			<article className="w-[90%] max-w-[732px] bg-panel border border-panelborder rounded-xl">
				<header className="text-center p-[4rem]">
					<img src={hpLogo} className="inline-block h-[48px] mx-auto" alt="" />
				</header>
				<section className="w-[90%] max-w-[455px] h-auto min-h-[80%] mx-auto pt-[4rem] pb-[4rem]">
					<form onSubmit={handleSubmit}>
						<p className="text-hlred">{isError ? isError: ""}</p>
						<div className="form-group mb-[2rem]">
							<label htmlFor="email" className="block text-lg mb-[8px]">Email address</label>
							<input type="email" disabled={isSubmitting} name="email" id="email" autoComplete="off" value={values.email} onChange={handleChange} onBlur={handleBlur} className="block w-full bg-input rounded-full h-[30px] text-lg color-white px-[15px] outline-none" />
							{errors.email && touched.email ? <span className="text-hlred">{errors.email}</span> : ""}
						</div>
						<div className="form-group mb-[2rem] relative">
							<label htmlFor="password" className="block text-lg mb-[8px]">Password</label>
							<div className="relative">
								<span className="absolute top-[6px] right-3" onClick={handleShowHidePassword}>
									{showPassword ? <Icon name="eyeOpen" size={18} />: <Icon name="showHide" size={18} />}
								</span>
								<input type={showPassword? "text" : "password"} disabled={isSubmitting} value={values.password} name="password" id="password" autoComplete="off" onChange={handleChange} onBlur={handleBlur} className="block w-full bg-input rounded-full h-[30px] text-lg color-white px-[15px] outline-none" />
							</div>
							{errors.password && touched.password ? <span className="text-hlred">{errors.password}</span> : ""}
							<div className="text-right mt-2">
								<Link to="forgot-password" className="underline">Forgot my password</Link>
							</div>
						</div>
						<div className="text-center mb-[2rem]">
							<button type="submit" disabled={isSubmitting} className="inline-block mx-auto bg-hlblue h-[30px] leading-[30px] text-white px-[3rem] w-[90%] max-w-[270px] rounded-full">
								{isSubmitting? "Loading..." : "Login"}
							</button>
						</div>
						<div className="text-center mt-18">
							<p>Need and account? <span className="underline">Contact your administrator</span></p>
						</div>
					</form>
				</section>
			</article>
		</div>
	</>
}

export default Login;