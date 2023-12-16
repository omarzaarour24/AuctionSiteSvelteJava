<script>
    import Register from "../lib/register.svelte";
    import Forms from "../Components/Forms.svelte";
    let items= ['Login', 'Register']
    let activeItem= 'Login';
    const TabChange = (e) => {
        activeItem=e.detail;
    }
    export let params;

</script>




<h1><Register {activeItem}{items} on:TabChange={TabChange}/>
    <Forms {activeItem}/>
</h1>
