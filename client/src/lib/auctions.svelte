<script>
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

export let items;
export let activeItem;
</script>
<div class="auctions">
    <ul>
        {#each items as item}
            <li on:click={()=> dispatch('auctionChange',item)}>
                <div class:active={item===activeItem}>{item}</div>
            </li>
        {/each}
    </ul>
</div>
<style>
    .auctions{
        margin-bottom: 40px;

    }
    ul{
        display: flex;
        justify-content: center;
        padding: 0;
        list-style-type: none;
    }
    li{
        margin: 0 16px;
        font-size: 18px;
        color: #555;
        cursor: pointer;
         }
.active{
    color: #ff3e00;
    border-bottom:2px solid #ff3e00 ;
    padding-bottom: 8px;
}
</style>