<script>
    import Tokens from "../tokenstore/Tokens.js";
    import {getID, IsAdmin, IsLogedIn, IsOwner, Owner} from "../Utils/user.js";
    import {deleteauc, Edit, getauctionifo} from "../Utils/AuctionCalls.js";
    import tokens from "../tokenstore/Tokens.js";
    import router from "page";
    let error;
    export let params;
    let feilds={title:'',Description:'',startingbid:0,duration:0,carbrand:''};
    let edit;
    let msg='';
    let can;

    async function getBidinfo(){
        const response = await fetch(`http://localhost:3000/api/auctions/${params.id}/bids`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json();
        return json;
    }

    async function removeBid(auctionid,bidid){
        console.log('auctionid: '+auctionid+' bidid: '+bidid)

        const response = await fetch(`http://localhost:3000/api/auctions/${auctionid}/bids/${bidid}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Tokens.token}`
            }
        })
        //refreshes page to show changes
        router(`/auctions/${params.id}`)
    }

    function getowner(UserId) {
        if (tokens.token !==undefined){
            console.log('token is here')
           if ( IsOwner(UserId)||IsAdmin(tokens.token)){
               console.log('can edit')
               return true;
           }
            if (Owner(params.id)||IsAdmin(tokens.token)){
                console.log('can edit')
                can=true;
            }
        }
    }

    const  deleteHandler=(auctionid,bidid)=>{
       removeBid(auctionid,bidid)
    }

    const  SubmitHandler=()=>{
        if (edit===true){
            edit=false;
        }else{
            edit=true
        }
    }

    function Save(){
        Edit(params,msg,edit,feilds)
        router('/');
    }

    let bid = {
        amount: undefined
    }

    const AddBidHandle=(MaxBid,amount)=>{
        if (amount>MaxBid){
            AddBid()
        }else if(amount<MaxBid){
            msg=='bid too small'
        }
    }

    //gives console error, although it works; no clue why i tried by best to find out the reason
    async function AddBid(){
        console.log('called')
            const response = await fetch(`http://localhost:3000/api/auctions/${params.id}/bids`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Tokens.token}`
                },
                body: JSON.stringify(bid)
            })
            const json = await response.json();
            if(response.status === 201){
                msg='bid added!!'
            }else{
                error = json.error;
            }
            router('/')
    }
</script>
<div class="auctioninfo">
    {#await getauctionifo(params.id)}
        <p>Loading auction.....</p>
    {:then auctions}
        <h1>{auctions.title}</h1>

        <p>Description: {auctions.Description}</p>

        <p>Brand: {auctions.carbrand}</p>

        <p>startingbid: {auctions.startingbid}</p>

        <p>Duration in hours: {auctions.duration}</p>

        <p>Status: {auctions.status}</p>

        <p>Highest bid: {auctions.MaxBid}</p>


<!--        bids -->
            <div class="bids">
                {#await getBidinfo()}
                {:then bids}
                    {#each bids as singleBid}
                        <p>User: {singleBid.UserId}</p>
                        <p>amount: {singleBid.amount}</p>
                        {#if singleBid.UserId==getID()||IsAdmin(Tokens.token)}

                            <button class="button-7"on:click={deleteHandler(auctions.id,singleBid.id)}>delete bid</button>
                        {/if}
                    {/each}
                {/await}
            </div>


    <div class="buttons">
        {#if getowner(auctions.UserId)}
            <button  class="Edit bn21" on:click={SubmitHandler}>Edit</button>
            <button  class="Delete bn21" on:click={deleteauc(params)}>Delete</button>
                {:else if IsLogedIn()}
                <input type="number" id="bid" bind:value={bid.amount}>
            <button class="button-7" on:click={AddBidHandle(auctions.MaxBid,bid.amount)}>Bid</button>
                {:else}
                <p class="nologin">Please login or create an account to bid</p>
        {/if}
    </div>
    {:catch error}
        <p>{error}</p>
    {/await}
    </div>

<p>{msg}</p>

<!--edit section-->
<div class="EditInfo" >
    {#if edit===true}
        <div>
            <p>Title: </p>
            <input class="TitleEdit" type="text" bind:value={feilds.title}>
        </div>
        <div>
            <p>Description: </p>
            <input class="descriptionEdit" type="text" bind:value={feilds.Description}>
        </div>
        <div class="Auction-form-field ">
            <div>
                <label for="carbrand">carbrand: </label>
            </div>
            <select class="selector"type="text" id="carbrand" bind:value={feilds.carbrand}>
                <option value="none">None</option>
                <option value="Acura">Acura</option>
                <option value="Alfa Romeo">Alfa Romeo</option>
                <option value="Aston Martin">Aston Martin</option>
                <option value="Audi">Audi</option>
                <option value="Bmw">Bmw</option>
                <option value="Bentley">Bentley</option>
                <option value="Bugatti">Bugatti</option>
                <option value="Buick">Buick</option>
                <option value="Cadillac">Cadillac</option>
                <option value="Chevrolet">Chevrolet</option>
                <option value="Citroën">Citroën</option>
                <option value="Dacia">Dacia</option>
                <option value="Datsun">Datsun</option>
                <option value="Dodge">Dodge</option>
                <option value="Ford">Ford</option>
                <option value="Fiat">Fiat</option>
                <option value="Genesis">Genesis</option>
                <option value="GMC">GMC</option>
                <option value="Hennessey">Hennessey</option>
                <option value="Honda">Honda</option>
                <option value="Hummer">Hummer</option>
                <option value="Hyundai">Hyundai</option>
                <option value="Jaguar">Jaguar</option>
                <option value="Jeep">Jeep</option>
                <option value="Koenigsegg">Koenigsegg</option>
                <option value="Lada">Lada</option>
                <option value="Lamborghini">Lamborghini</option>
                <option value="Lancia">Lancia</option>
                <option value="Land Rover">Land Rover</option>
                <option value="Lexus">Lexus</option>
                <option value="Lincoln">Lincoln</option>
                <option value="Lotus">Lotus</option>
                <option value="Maserati">Maserati</option>
                <option value="McLaren">McLaren</option>
                <option value="McLaren">McLaren</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="Mercury">Mercury</option>
                <option value="Mini">Mini</option>
                <option value="Mitsubishi">Mitsubishi</option>
                <option value="Nissan">Nissan</option>
                <option value="Opel">Opel</option>
                <option value="Pagani">Pagani</option>
                <option value="Pontiac">Pontiac</option>
                <option valu="Porsche">Porsche</option>
                <option value="RAM">RAM</option>
                <option value="Renault">Renault</option>
                <option value="Rolls-Royce">Rolls-Royce</option>
                <option value="SAAB">SAAB</option>
                <option value="SEAT">SEAT</option>
                <option value="Škoda">Škoda</option>
                <option value="Subaru">Subaru</option>
                <option value="Suzuki">Suzuki</option>
                <option value="Toyota">Toyota</option>
                <option value="UAZ">UAZ</option>
                <option value="Vauxhall">Vauxhall</option>
                <option value="Volkswagen">Volkswagen</option>
                <option value="Volvo">Volvo</option>
                <option value="W Motors">W Motors</option>
                <option value="other">other</option>

            </select>
        </div>
        <div>
            <p>startingbid: </p>
            <input class="startingbidEdit" type="text" bind:value={feilds.startingbid}>
        </div>
        <div>
            <p>duration: </p>
            <input class="durationEdit" type="text" bind:value={feilds.duration}>
        </div>

<!--        the req works and the info is updated but it gives errors in the console for no reason-->
<!--        i tired my best to find a solution and even asked my classmates for help in case i am missing something-->
<!--        but all our brain power combined couldnt find a solution -->
        <button  class="Save bn21" on:click={Save}> Save</button>
        <p>{msg}</p>
        {/if}
</div>



<style>
    .Auction-form-field{
        padding-top: 10px;
    }
    .bids{
        flex-direction: column;
    }
    .nologin{
        color: red;
    }
        .EditInfo{
            text-align: center;
        }
        .auctioninfo{
            text-align: center;
        }





    .button-7 {
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