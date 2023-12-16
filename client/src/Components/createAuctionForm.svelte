<script>
    import {getID} from "../Utils/user.js";
    import router from "page";
    import Tokens from "../tokenstore/Tokens.js";
    let fields={title:'',Description:'',startingbid:0,duration:0,userid:getID(),MaxBid:0,carbrand:'',status:'open'}
    let msg='';
    export let activeItem;

    async function NewAuction() {
        const response = await fetch('http://localhost:3000/api/auctions',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Tokens.token}`
            },
            body: JSON.stringify(fields)
        })

        const json = await response.json();

        if(response.ok) {
            console.log(json.token)
            msg="Auction created!!"
            return
            router('/users/'+getID()+'/auctions')

        } else {
            msg = json.error;
        }
    }
    let SubmitHandler=()=>{
            NewAuction()
            activeItem==='current Auctions';
    };
    </script>

    <form on:submit|preventDefault={SubmitHandler}>
        <div class="Auction title">
            <label for="title">title: </label>
            <input type="text" id="title" bind:value={fields.title}>
        </div>
        <div class="Auction-form-field ">
            <label for="discription">description: </label>
            <input class="discription" type="text" id="discription" bind:value={fields.Description}>

        </div>
        <div class="Auction-form-field ">
            <label for="carbrand">carbrand: </label>
            <select class="selector"type="text" id="carbrand" bind:value={fields.carbrand}>
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
        <div class="Auction-form-field">
            <label for="starting bid">starting bid: </label>
            <input type="number" id="starting bid" bind:value={fields.startingbid}>

        </div>
        <div class="Auction-form-field">
            <label for="duration">duration in hours: </label>
            <input type="number" id="duration" bind:value={fields.duration}>

        </div>
        <button type="submit"  class="submitButton bn21">Add Auction</button>
        <p>{msg}</p>
    </form>

    <style>
        .discription{
            height: 100px;
            text-align: start;
        }
        form{
            width: 400px;
            margin: 0 auto;
            text-align: center;
        }
        Auction-form-field{
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

        .submitButton {
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
        .submitButton:hover {
            background-position: 100% 0;
            moz-transition: all .4s ease-in-out;
            -o-transition: all .4s ease-in-out;
            -webkit-transition: all .4s ease-in-out;
            transition: all .4s ease-in-out;
        }
        .submitButton:focus {
            outline: none;
        }
        .submitButton.bn21 {
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