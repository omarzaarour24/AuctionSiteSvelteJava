import jwt from "jsonwebtoken";

export function maxID(data){
    let max=-1;

    data.forEach(item=>{
        if (max<item.id){
            max=item.id;
        }
    });
    return max;
}
export function findByID(data,id){
    return data.find(item=>item.id===id);
}
export function findAuctionsByID(data,UserId){
    let found = [];
    data.forEach(item => {
        if(item.UserId === UserId){
            found.push(item)
        }
    })
    return found;
    //does the same thing but looks more big brain
    //return data.find(item=>item.id===id);
}
export function findmaxBid(data,id){
    let max=0;
    if (data.amount>max){
        max=data.amount
        return max;
    }
    return undefined;
}
export function IsOwner(data, id) {
    if (data.userid===id){
        return true;
    }else{
        return false;
    }
}
export function GetToken(header){
    const check = header.split(' ');
    if(check.length === 2){
        return check[1];
    }
}
export function decodeToken(token){
    return jwt.decode(GetToken(token));
}
export function giveID(data){
    let id=maxID(data);
    return id==id+1;
}
export function checkId(id){
    if(isNaN(id)){
        return true;
    }
    return false;
}

//filter functions
export function SortByPriceOrder(info,PriceOrder){

if (PriceOrder==='ascending'){
    return info.sort(function(a,b){
        return a.MaxBid-b.MaxBid
    })

}else if (PriceOrder==='descending'){
    return info.sort(function(a,b){
        return b.MaxBid-a.MaxBid
    })
}
}

export function GetAuctionsWithSameCarBrand(info,carbrand){
    let filteredData = [];
    info.forEach(item => {
        if(item.carbrand === carbrand){

            filteredData.push(item);
        }
    });
    return filteredData;

}

export function GetByStatus(info,status){
    let FilteredAuctions = [];
    // info.forEach(item=>{if (item.status===status)})
    info.forEach(item => {
        if(item.status === status){
            FilteredAuctions.push(item);
        }
    });
    return FilteredAuctions;
}

export function SearchForMatchingTitles(info,Search){
    let FilteredAuctions = [];

    info.forEach(item => {
        if (item.title===Search){
            FilteredAuctions.push(item);
        }
    })
    return FilteredAuctions;
}
