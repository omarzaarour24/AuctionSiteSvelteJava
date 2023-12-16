<script>
    import Listofobjects from "../Components/Listofobjects.svelte";
    import router from "page";
    let IsAuction=true;
    let params;

    //filter script
    let query='';
    let priceorder='none';
    let carbrand='none';
    let Status='none';
    let Search='';
    let  url ='http://localhost:3000/api/auctions';
    async function AllAuctions(){
        if(query !== ''){
            url = url + `${query}`
        }
        const res=await fetch(url,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            }

        })
        const info = await res.json();
        Search = '';
        query='';
        url = 'http://localhost:3000/api/auctions';
        if (res.ok){
            console.log(info)
            return info;
        }else{
            throw new Error(res.error);
        }
    }
    let withfilter=AllAuctions();
    function filter(){
        //checks if all query params are empty
        if (priceorder==='none'&&carbrand==='none'&&Status==='none'){
            query='';
            router('/')
        }


        if (priceorder !== 'none') {
            if (query !== '') {
                query = query + `&priceorder=${priceorder}`
            }else{
                query = `?priceorder=${priceorder}`
            }
        }
        if (carbrand !== 'none') {
            if (query !== '') {
                query = query + `&carbrand=${carbrand}`
            }else{
                query = `?carbrand=${carbrand}`
            }
            carbrand='none';
        }
        if (Status !== 'none') {
            if (query !== '') {
                query = query + `&Status=${Status}`
            }else{
                query = `?Status=${Status}`
            }
        }
        withfilter=AllAuctions(Search,query);
    }
    function SearchForMatchingAuctions(){
        console.log('called')
        if(Search === ''){
            router('/');
        }
        if (Search !== '' && query !== '') {
            query = query + `&Search=${Search}`;
            router(`/${query}`);
        }

        if(Search !==''){
            console.log('not empty')
            query = `?Search=${Search}`;
            router(`/${query}`);
        }

        withfilter=AllAuctions();
    }
</script>
<!--Filter-->
<div class="Filter">
    <p class="FilterOptionName"> Brand: </p>
    <select class="selector"type="text" bind:value={carbrand}>
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


    <p class="FilterOptionName"> Price: </p>
    <select class="selector" bind:value={priceorder}>
        <option value="none">None</option>

        <!--    small to big-->
        <option value="ascending"> ascending </option>
        <!--    big to small-->
        <option value="descending"> descending</option>

    </select>
    <p class="FilterOptionName"> Status: </p>
    <select class="selector" bind:value={Status}>
        <option value="none">None</option>
        <option value="open"> open </option>
        <option value="closed"> closed </option>
    </select>
    <div class="FilterButton">
        <button class="button-7" on:click={filter}>Filter auctions</button>
    </div>
    <div class="SearchSection">
        <input class="SearchTextBox" type="text" id="search" bind:value={Search}>
        <button class="button-7" on:click={SearchForMatchingAuctions}>Search</button>
    </div>
</div>

<div>
    {#await withfilter}
        <p>Loading.....</p>
        {:then params}
        <Listofobjects {params}{IsAuction}/>
        {:catch error}
        <p>{error}</p>
        {/await}
</div>

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




    .FilterButton{
        width: 100px;
        height: 10px;
    }
    .SearchTextBox{
        padding-left: 20px;
        padding-right: 20px;
        width: 120px;
        height: 10px;
    }
    .FilterOptionName{
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .Filter{
        display: flex;
        justify-content: center;
        flex-direction: row;

    }
    select{
        width: 150px;
        height: 30px;
    }
</style>