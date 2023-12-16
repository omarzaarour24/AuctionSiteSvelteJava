<script>
    import Auction from '../lib/auctions.svelte'
    import CreateAuctionForm from '../Components/createAuctionForm.svelte'
    import {GetAuctions, getallauctions} from '../Utils/AuctionCalls.js'
    import Listofobjects from "../Components/Listofobjects.svelte";
    let items= ['current Auctions', 'Add new Auction'];
    let activeItem= 'Add new Auction';
    let IsAuction;
    import {getID, IsAdmin} from "../Utils/user.js";
    import Tokens from "../tokenstore/Tokens.js";
    import {AllUsers} from "../Utils/UserCalls.js";
    let userid=getID();
    if (IsAdmin(Tokens.token)==true){
        items=['Users','Auctions'];
        activeItem='Users';
    }
    const auctionChange = (e) => {
        activeItem=e.detail;

        if(activeItem==='current Auctions'){
            IsAuction=true;
        }else if (activeItem==='Users'){
            IsAuction=false;
        }else if(activeItem==='Auctions'){
            IsAuction=true;
        }
    }


</script>

<h1><Auction {activeItem}{items} on:auctionChange={auctionChange}/>


    {#if activeItem==='current Auctions'}
        {#await GetAuctions()}
            <p>Loading.....</p>
        {:then params}
            <Listofobjects {params}{IsAuction}/>
        {:catch error}
            <p>{error}</p>
        {/await}

    {:else if activeItem==='Add new Auction'}
        <CreateAuctionForm {activeItem}/>


    {:else if activeItem==='Users'}
        {#await AllUsers()}
            <p>Loading.....</p>
        {:then params}
            <Listofobjects {params}{IsAuction}/>
        {:catch error}
            <p>{error}</p>
        {/await}


    {:else if activeItem==='Auctions'}
        {#await getallauctions()}
            <p>Loading.....</p>
        {:then params}
            <Listofobjects {params}{IsAuction}/>
        {:catch error}
            <p>{error}</p>
        {/await}
        {/if}
</h1>
