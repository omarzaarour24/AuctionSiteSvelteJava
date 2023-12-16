<script>
    import {LoginHandler, NewAccount} from "../Utils/UserCalls.js";
    let fields={'Email':undefined,'Password':undefined};
    let errors={Email:'',Password:''}
    let valid=false;
    let error;
    let msg='';
    export let activeItem;

    let SubmitHandler=()=>{
        //checks if Email is too short or long
        if (fields.Email.trim().length<8){
            valid=false;
            errors.Email='email is too short ';
        }else if (fields.Email.trim().length>= 40){
            valid=false;
            errors.Email='email is too long!';
        }else{
            errors.Email='';
        }
        //checks if Password is too short or long
        if (fields.Password.trim().length<5){
            valid=false;
            errors.Password='Password is too short ';
        }else if (fields.Password.trim().length>40){
            valid=false;
            errors.Password='Password is too long';
        }else{
            valid=true;
            errors.Password='';
        }
        if (valid){

            if (activeItem==='Login'){
                LoginHandler(fields,msg)
            }else if (activeItem==='Register'){
                NewAccount(fields,msg)
            }


        }
    };

</script>
<form on:submit|preventDefault={SubmitHandler}>
    <div class="User Email">
        <label for="email">Email: </label>
        <input type="text" id="email" bind:value={fields.Email}>
        <div class="error">{errors.Email}</div>
    </div>

    <div class="Login-form-field ">
        <label for="Password">Password: </label>
        <input class="Password" type="password" id="Password" bind:value={fields.Password}>

        <div class="error">{errors.Password}</div>
    </div>

    {#if activeItem==='Login'}
        <button type="submit"  class="Submit bn21">Login</button>
    {:else if activeItem==='Register'}
        <button type="submit"  class="Submit bn21" >Register</button>
    {/if}
    <p>{msg}</p>
</form>
<style>
    .Password{
        text-align: start;
    }
    form{
        width: 400px;
        margin: 0 auto;
        text-align: center;
    }
    Login-form-field{
        margin: 18px auto;
    }
    input{
        width: 100%;
        border-radius:6px ;
    }
    label{
        margin: 10px auto;
        text-align: left;
    }
    .error{
        color: #ff3e00;
        font-size: 14px;
    }
    .Submit {
        width: 160px;
        font-size: 16px;
        font-weight: 600;
        color: #fff;
        cursor: pointer;
        margin: 20px;
        height: 55px;
        text-align:center;
        border: none;
        background-size: 300% 100%;
        border-radius: 50px;
        moz-transition: all .4s ease-in-out;
        -o-transition: all .4s ease-in-out;
        -webkit-transition: all .4s ease-in-out;
        transition: all .4s ease-in-out;
    }
    .Submit:hover {
        background-position: 100% 0;
        moz-transition: all .4s ease-in-out;
        -o-transition: all .4s ease-in-out;
        -webkit-transition: all .4s ease-in-out;
        transition: all .4s ease-in-out;
    }
    .Submit:focus {
        outline: none;
    }
    .Submit.bn21 {
        background-image: linear-gradient(
                to right,
                #fc6076,
                #ff9a44,
                #ef9d43,
                #e75516
        );
        box-shadow: 0 4px 15px 0 rgba(252, 104, 110, 0.75);
    }
</style>