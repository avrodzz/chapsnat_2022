export default function LoginScreen({navigation}) {
	// Need to have these particular states to login as a user
    const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const auth = getAuth();

    // Very similar handleSubmit as in SignupScreen.js, but the functionality here is to use the states to sign the existing user in
	async function handleSubmit() {
		console.log("handle submit envoked!!")

        // Waiting for the email and password to be retrieved
		await signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user; 
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
            // Needed these errorCode and errorMessage console.log statements
            console.log(errorCode, "<---- error code");
            console.log(errorMessage, "<--- error message")
		});
	}
    
    // Screen that allows the user to enter in the email and password and sign in
    // - This is where setEmail and setPassword come into play
	return (
		<>
			<Text style={styles.bigBlue}>Login Here</Text>
			<View style={styles.inputView}>
				<TextInput
					placeholder='Email'
					placeholderTextColor="#003f5c"
					onChangeText={(email) => setEmail(email)}
				/>
			</View>
			<View style={styles.inputView}>
				<TextInput
					placeholder='Password'
					secureTextEntry={true}
					placeholderTextColor="#003f5c"
					onChangeText={(password) => setPassword(password)}
				/>
			</View>
			<TouchableOpacity style={styles.loginBtn} onPress={() => {
				handleSubmit();
			}}>
				<Text style={styles.loginText}>LOGIN</Text>
			</TouchableOpacity>
            <TouchableOpacity style={styles.redirectBtn} onPress={() => {
                navigation.navigate("Signup")
            }}>
                <Text>Don't have an account? Sign up here</Text>
            </TouchableOpacity>
		</>
	)
}