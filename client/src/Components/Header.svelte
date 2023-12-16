<script>
    import Tokens from "../tokenstore/Tokens.js";
    import {getEmail, getID} from "../Utils/user.js";
    import router from "page";
    import {DeleteAccount} from "../Utils/UserCalls.js";

    export let active;
    function LogOut(){
        Tokens.token = undefined;
        router('/');
    }
    function MyAccount() {
        router('/users/'+getID()+'/auctions')
    }
    function Delete(){
        DeleteAccount()
        Tokens.token = undefined;
        router('/');
    }
</script>


<header>
    <h1>
        <img src="../src/img/pinpng.com-outline-png-203690.png">
    </h1>


    <div>
        <ul>
            <li class="SiteName"><a class:active={active === "/"} href="/">AutoBidMasters</a></li>

            {#if Tokens.token}
                <div class="LoggedInButtons">
                    <a href="/user/{getID()}"><p>Welcome back:  {getEmail(Tokens.token)}</p></a>
                    <li><button class="button-7" on:click={MyAccount}>MyAccount</button></li>
                    <li><button class="button-7" on:click={LogOut}>LogOut</button></li>
                    <li><button  class="button-7" on:click={Delete}>Delete Account</button></li>
                </div>


            {:else }
                <li class="button-7"><a class:active={active === "/LoginOrRegister"} href="/LoginRegister">Login/Register</a></li>

            {/if}
        </ul>
    </div>
</header>



<style>



    .button-7 {
        float: right;
        background-color: #0095ff;
        border: 1px solid transparent;
        border-radius: 3px;
        box-shadow: rgba(255, 255, 255, .4) 0 1px 0 0 inset;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        font-family: -apple-system,system-ui,"Segoe UI","Liberation Sans",sans-serif;
        font-size: 13px;
        font-weight: 400;
        line-height: 1.15385;
        margin: 0;
        outline: none;
        padding: 8px .8em;
        position: relative;
        text-align: center;
        text-decoration: none;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        vertical-align: baseline;
        white-space: nowrap;
    }

    .button-7:hover,
    .button-7:focus {
        background-color: #07c;
    }

    .button-7:focus {
        box-shadow: 0 0 0 4px rgba(0, 149, 255, .15);
    }

    .button-7:active {
        background-color: #0064bd;
        box-shadow: none;
    }
    .LoggedInButtons{
        padding-right: 30px;
        float: right;
    }
    header{
        background: aliceblue;
        padding: 20px;
    }
    h1{
        margin: 0;
        text-align: start;
    }
    img{
        max-width: 250px;
    }
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: aliceblue;
    }

    li {
        float: left;
    }

    li a {
        display: block;
        color: black;
        text-align: center;
        padding: 16px;
        text-decoration: none;
    }

    .SiteName{
        font-size: 25px;
    }
    .SiteName a:hover{
        color: cornflowerblue;
        background-color: aliceblue;
    }

</style>