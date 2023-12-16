<script>
    import {Getuser, AdminDeleteAccount, EditUser} from "../Utils/UserCalls.js";
    export let params;
    let feilds={Email:'',Password:''};
    let edit;
    let msg;
    const  EditHandler=()=>{
        console.log(params.id)
        if (edit===true){
            edit=false;
        }else{
            edit=true
        }
    }
</script>
<div class="auctioninfo">
    {#await  Getuser(params.id)}
        <p>Loading user information.....</p>
    {:then user}
        <h1>{user.Email}</h1>
        <p>Password: {user.Password}</p>
    {:catch error}
        <p>{error}</p>
    {/await}
    <button  class="Edit bn21" on:click={EditHandler}>Edit</button>
    <button  class="Delete bn21" on:click={AdminDeleteAccount(params.id)}>Delete</button>
</div>

<div class="EditInfo" >
    {#if edit===true}
        <div>
            <p>Email: </p>
            <input class="TitleEdit" type="text" bind:value={feilds.Email}>
        </div>
        <div>
            <p>Password: </p>
            <input class="descriptionEdit" type="text" bind:value={feilds.Password}>
        </div>
        <button  class="Save bn21" on:click={EditUser(params.id,msg,edit,feilds)}> Save</button>
    {/if}
</div>

<style>
    .EditInfo{
        justify-content: center;

    }
    .auctioninfo{
        text-align: center;
    }

    /*EditBTN*/
    .Edit {
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
    .Edit:hover {
        background-position: 100% 0;
        moz-transition: all .4s ease-in-out;
        -o-transition: all .4s ease-in-out;
        -webkit-transition: all .4s ease-in-out;
        transition: all .4s ease-in-out;
    }
    .Edit:focus {
        outline: none;
    }
    .Edit.bn21 {
        background-image: linear-gradient(
                to right,
                #fc6076,
                #ff9a44,
                #ef9d43,
                #e75516
        );
        box-shadow: 0 4px 15px 0 rgba(252, 104, 110, 0.75);
    }

    /*DeleteBTN*/
    .Delete {
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
    .Delete:hover {
        background-position: 100% 0;
        moz-transition: all .4s ease-in-out;
        -o-transition: all .4s ease-in-out;
        -webkit-transition: all .4s ease-in-out;
        transition: all .4s ease-in-out;
    }
    .Delete:focus {
        outline: none;
    }
    .Delete.bn21 {
        background-image: linear-gradient(
                to right,
                #fc6076,
                #ff9a44,
                #ef9d43,
                #e75516
        );
        box-shadow: 0 4px 15px 0 rgba(252, 104, 110, 0.75);
    }

    /*SaveBTN*/
    .Save {
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
    .Save:hover {
        background-position: 100% 0;
        moz-transition: all .4s ease-in-out;
        -o-transition: all .4s ease-in-out;
        -webkit-transition: all .4s ease-in-out;
        transition: all .4s ease-in-out;
    }
    .Save:focus {
        outline: none;
    }
    .Save.bn21 {
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