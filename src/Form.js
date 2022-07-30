import { useState, useEffect } from "react";

function Form() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneType, setPhoneType] = useState('Home');
    const [student, setStudent] = useState(false);
    const [instructor, setInstructor] = useState(false);
    const [bio, setBio] = useState('');
    const [signedUp, setSignedUp] = useState(false);
    const [formErrors, setErrors] = useState([]);

    const instructorHandler = e => {
        setInstructor(!instructor);

        if (student) { setStudent(!student) }
    }

    const studentHandler = e => {
        setStudent(!student);

        if (instructor) { setInstructor(!instructor) }
    }

    //useEffect(() => console.log('instructor', instructor), [instructor]);
    //useEffect(() => console.log('student', student), [student])

    const phoneValidation = (number) => {
        if (number.length === 0) {return true}
        else if (number.length > 12) {return false}

        let allowed = ['1','2','3','4','5','6','7','8','9','0',"-"];
        let dashCount = 0;

        for (let i = 0; i < number.length; i++) {
            if (!allowed.includes(number[i])) {return false}
            if (number[i] === "-") {dashCount++}
        }

        if (dashCount > 2 || number.length < 10) {return false}
        else {return true}
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const errors = [];
        if (!name) {errors.push('Please enter your name')}
        if (!email) {errors.push('Please enter an email')}
        if (!email.includes('@')) {errors.push('email must be properly formatted')}
        if (!phoneValidation(phone)) {
            errors.push('please format phone number like XXX-XXX-XXXX (no spaces)');
        }
        if (bio.length > 280) {errors.push("Bio character limit of 280")}

        setErrors(errors);

        if (errors.length > 0) {
            return alert(`Cannot submit`);
        }

        const formData = {
            name,
            email,
            phone,
            phoneType,
            bio,
            signedUp: signedUp,
            submitted: new Date()
        }

        if (instructor) { formData.staff = 'instructor' }
        if (student) {formData.staff = 'student' }

        console.log(JSON.stringify(formData));
    }

    return (
        <form onSubmit={onSubmit}>
            {<div>
                <ul>
                    {formErrors.map(error => {
                        return <li>{error}</li>
                    })}
                </ul>
            </div>}
            <div>
                <label htmlFor="name">Name:</label>
                <input id="name" type='text' onChange={e => setName(e.target.value)} value={name} />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input id='email' type='text' onChange={e => setEmail(e.target.value)} value={email} />
            </div>
            <div>
                <label htmlFor='phone'>Phone:</label>
                <input id='phone' type='text' onChange={e => setPhone(e.target.value)} value={phone} />

                <select name="phoneType" onChange={e => setPhoneType(e.target.value)}>
                    <option>Home</option>
                    <option>Work</option>
                    <option>Mobile</option>
                </select>
            </div>
            <div>
                <fieldset>
                    <legend>Staff</legend>
                    <div>
                        <input type='radio' id='Instructor' name='staff' onChange={instructorHandler} />
                        <label htmlFor='Instructor'>Instructor</label>
                    </div>
                    <div>
                        <input type='radio' id="Student" name='staff' onChange={studentHandler} />
                        <label htmlFor='Student'>Student</label>
                    </div>
                </fieldset>
            </div>
            <div>
                <label htmlFor='bio'>Bio:</label>
                <textarea id='bio' name='bio' onChange={e => setBio(e.target.value)} value={bio}/>
            </div>
            <div>
                <label htmlFor='signUp'>Sign up for email notifications</label>
                <input id='signUp' type='checkbox' name='signUp' onChange={e => setSignedUp(!signedUp)}/>
            </div>
            <button>Submit</button>
        </form>
    );
}

export default Form;
