<script>
  import router from 'page';
  import Home from "./pages/Home.svelte";
  import Header from "./Components/Header.svelte";
  import MyAccount from "./pages/MyAccount.svelte";
  import AuctionPage from "./pages/AuctionPage.svelte";
  import LoginRegister from "./pages/LoginRegister.svelte";
  import UserPage from "./pages/UserPage.svelte";

  let page;
  let params;
  let currentRoute;
  router('/', (ctx) => {
    page = Home;
    currentRoute = ctx.pathname;
  });
  router('/users/:id/auctions', (ctx) => {
      params=ctx.params;
      page = MyAccount;
      currentRoute = ctx.pathname;
  });
  router('/user/:id', (ctx) => {
      params=ctx.params;
      page = UserPage;
      currentRoute = ctx.pathname;
  });
  router('/auctions/:id', (ctx) => {
      params=ctx.params;
      page = AuctionPage;
      currentRoute = ctx.pathname;
  });
  router('/LoginRegister', (ctx) => {
      params=ctx.params;
      page = LoginRegister;
      currentRoute = ctx.pathname;
  });

  router.start();
</script>
<Header active={currentRoute}/>
<main>
    <svelte:component this={page} {params} />
    </main>
<style>
    header{

    }
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  main {
      max-width: 960px;
      margin: 40px auto;
  }
</style>