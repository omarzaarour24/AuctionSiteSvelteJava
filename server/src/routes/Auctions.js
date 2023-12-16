import express from 'express';
const router= express.Router();
import auctioninfo from '../Data/auctioninfo.js'
import {findByID, maxID, decodeToken, checkId, GetAuctionsWithSameCarBrand, GetByStatus, SearchForMatchingTitles, SortByPriceOrder} from "../utils/info utils.js";
import {IsLogedIn} from "../Middleware/IsLogedIn.js";
router.get('/',function (req, res) {
    const {priceorder,carbrand,Status,Search}= req.query;
    console.log(req.query)
    if(priceorder !== undefined || carbrand !== undefined || Status !== undefined || Search !== undefined) {
        let FilteredAuctionList =[];
        if (priceorder !== undefined) {
            FilteredAuctionList = SortByPriceOrder(auctioninfo, priceorder)
        }
        if (carbrand!==undefined){
            FilteredAuctionList=GetAuctionsWithSameCarBrand(auctioninfo,carbrand)
        }
        if (Status!==undefined){
            FilteredAuctionList=GetByStatus(auctioninfo,Status)
        }
        if (Search!==undefined){
            FilteredAuctionList=SearchForMatchingTitles(auctioninfo,Search)
        }
        return res.status(200).json(FilteredAuctionList);
    }
    return res.status(200).json(auctioninfo);
});

//gets one auction
router.get('/:id',function (req, res) {

    if (isNaN(req.params.id)){
        return res.status(400).json({error: 'the given ID is not a number'});
    }
    const auction=findByID(auctioninfo,Number.parseInt(req.params.id))
    return res.status(200).json(auction);
});

router.patch('/:id',IsLogedIn,function (req,res) {
    const {authorization} = req.headers;
    const data = decodeToken(authorization)
    const found = findByID(auctioninfo,Number.parseInt(req.params.id));
    if (isNaN(req.params.id)){
        return res.status(400).json({error: 'the given ID is not a number'});
    }

    if ('id' in req.body){
        return res.status(400).json({error:'id cannot be changed'});
    }

    if (data.isAdmin==true||found.UserId==data.id){
        Object.assign(found,req.body);
        return res.status(200).json();

    }else{
        return res.status(401).json({error: 'Req can only be made by the owner of the auction or by admins'});
    }



    const findauction = findByID(auctioninfo,Number.parseInt(req.params.id));

    Object.assign(findauction,req.body);
    return res.json(findauction);
});

//posts new auction
router.post('/',IsLogedIn,function (req,res){
    const {authorization} = req.headers;
    const newauction=req.body;

    if('id' in newauction){
        return res.status(400).json({error: 'Id is assigned automatically and cant be entered or changed'});
    }

    newauction.id=maxID(auctioninfo)+1;
    newauction.UserId=decodeToken(authorization).id;
    newauction.bids=[];
    auctioninfo.push(newauction);
    return res.status(201).json(newauction.id);
});


//gets bids of auction
router.get('/:id/bids',function (req,res) {
    const {id} = req.params;
    if(isNaN(id)){
        return res.status(400).json({error:'Provided ID is not a number!'});
    }
    const foundAuction = findByID(auctioninfo,Number.parseInt(id));


    if(!foundAuction){
        return res.status(404).json({error:'No auction matching the ID was found'});
    }
    foundAuction.bids.forEach(item => {
        if (item.amount > foundAuction.MaxBid) {
            foundAuction.MaxBid = item.amount;
        }
    })
    return res.status(302).json(foundAuction.bids);
});


//posts new bid
router.post('/:id/bids',IsLogedIn,function (req,res){
    let bid = req.body;
    bid.amount = Number.parseInt(bid.amount);
    const {authorization} = req.headers;
    const UserId = decodeToken(authorization).id;

    if(checkId(Number.parseInt(req.params.id))){
        return res.status(400).json({error:'Provided ID is not a number!'});
    }

    if('id' in bid){
        return res.status(400).json({error: 'New auction data cannot contain id'});
    }
    let found = findByID(auctioninfo,Number.parseInt(req.params.id))
    bid.id = maxID(found.bids) + 1;
    bid.UserId = UserId;

    if(found.MaxBid < bid.amount){
        console.log('amount higher than maxbid')
        found.bids.push(bid);
        Object.assign(auctioninfo,found);
        found.MaxBid= bid.amount;
        return res.status(201).json({message: "Bid added!!"});
    }else{
        console.log('amount not higher than max bid')
        return res.status(400).json({error: 'Bid must be higher than current bid'});
    }
})


//deletes auction
//i was going to use code 410 for when the delete is successfully because (gone) but i saw on google that 200 or 204 also implies the same so i went with 200
router.delete('/:id',IsLogedIn,function (req,res){
    const {authorization} = req.headers;
    if (isNaN(req.params.id)){
        return res.status(400).json({error: 'the given ID is not a number'});
    }

    if (req.params.id == undefined){
        return res.status(404).json({error: 'ID not given'});
    }
    let data=decodeToken(authorization);
    let found=findByID(auctioninfo,Number.parseInt(req.params.id));
    if (found){
        if (data.isAdmin===true||found.UserId===data.id){
            auctioninfo.splice(auctioninfo.indexOf(found),1);
            return res.status(200).json();

            console .log("deleted auc")
        }else{
            return res.status(401).json({error: 'Req can only be made by the owner of the auction or by admins'});
        }
    }else{
        return res.status(404).json();
    }
});

//deletes bid
router.delete('/:id/bids/:bidid',IsLogedIn,function (req,res){
    const {id,bidid} = req.params;
    const {authorization} = req.headers;
    if(isNaN(id)){
        return res.status(400).json({error: 'Provided auction ID is not a number!'});
    }

    if(isNaN(bidid)){
        return res.status(400).json({error: 'Provided user ID is not a number!'});
    }

    if(bidid !== undefined || id !== undefined){
        let found;
        const userinfoFromTOken = decodeToken(authorization);
        let foundObject = findByID(auctioninfo,Number.parseInt(id));
        foundObject.bids.forEach(item => {
            if (item.amount>foundObject.MaxBid){
                foundObject.MaxBid=item.amount;
            }
            if(item.id === Number.parseInt(bidid)){
                if(item.UserId === userinfoFromTOken.id||userinfoFromTOken.IsAdmin==true) {
                    foundObject.bids.splice(foundObject.bids.indexOf(item),1);
                    found=true;
                    Object.assign(auctioninfo,foundObject)
                    return res.status(410).json();
                }else{
                    return res.status(401).json({error: 'Unauthorized'});
                }
            }
        })
        if (!found){
            return res.status(404).json({error: 'no bids for user were found'});
        }

        return res.status(404).json();
    }
})

export default router;
