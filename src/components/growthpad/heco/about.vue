<script lang="ts">
</script>

<template>
  <div class="table-box font-kdFang">
    <table border="0" cellpadding="0" cellspacing="0">
      <thead>
        <tr>
          <th>NFTs</th>
          <th>Partners</th>
          <th>Items</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowspan="4">Privileged NFT</td>
          <td rowspan="4">Filda</td>
          <td>10 times revenue card, annualized revenue of about 100%</td>
        </tr>
        <tr>
          <td>5 times revenue card, annualized revenue of about 50%</td>
        </tr>
        <tr>
          <td>Double revenue card with an annualized revenue of about20%</td>
        </tr>
        <tr>
          <td>VIP rights card</td>
        </tr>
        <!---------->
        <tr>
          <td>Crypto ArtNFT</td>
          <td>
            <span class="block">TKSX graffiti artist</span>
            <span class="block link">iBox NFT platform</span>
          </td>
          <td>First release/exclusive/selected crypto artwork</td>
        </tr>
        <!---------->
        <tr>
          <td rowspan="4">Game Props NFT</td>
          <td rowspan="4">Evolution Land</td>
          <td>Land power, worth of 30K RING</td>
        </tr>
        <tr>
          <td>Apostle, worth of 30000RING</td>
        </tr>
        <tr>
          <td>Gold chest, worth of 1000 rings</td>
        </tr>
        <tr>
          <td>Sliver chest, worth of 100 rings</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="about-note font-kdFang pb-15">
    <div class="mt-6">
      <h3>Note:</h3>

      <p>All NFTs can be resold or traded except the Privileged NFT;
        The winning rate will be dynamically adjusted according to the actual number of participating addresses, and the above winning rate will be estimated according to 10,000 addresses.</p>
    </div>
    <div class="mt-6">
      <h3>FAQ About the Platform:</h3>

      <h5>1. What are NFT Mystery Boxes, Privileged NFTs, and Prop Game Items？</h5>
      <p>NFT refers to Non-Fungible Token, and NFT Mystery box refers to the collection of various Non-Fungible tokens.
        After winning the Privileged NFT, users can automatically obtain the special rights and interests corresponding to the NFT, such as doubling the revenues obtained by saving the coins in Filda, etc., and this type of NFT could not be resold or trade.
        After winning the Game Props NFT, Users can operate and resell the NFT in the game of Evolution Land.
        After winning the Crypto Art NFT, it can be resold in iBox after users obtain the NFT, or hold for a long time to wait for the appreciation of the artwork to obtain the future value.
      </p>

      <h5>2. What’s Heco？</h5>
      <p><a>HECO Chain</a> is an EVM-compatible public chain with an efficient and low-cost on-chain environment for DApps, smart contracts, and digital assets. The native digital asset of Huobi ecological chain is HT, which adopts the consensus mechanism of HPOS. For now, more than 200 developers have joined HECO, with an average of 4 million+ transactions per day and 100,000 + active addresses per day.</p>

      <h5>3. What is Huobi global?</h5>
      <p>Huobi Global is a global blockchain asset financial services provider including exchange, trade, wallet, and storage. Since its establishment in 2013.</p>

      <h5>4. What’s Filda？</h5>
      <p><a>FilDA</a> is the first HECO-based cross-chain lending DeFi project which provides users with deposit, lending and liquid mining services. It now supports lending for 20 kinds of assets, including HUSD and HBTC. Interest and FilDA can be obtained by depositing digital assets, and FilDA can be earned by borrowing digital assets.</p>

      <h5>5. What’s Evolution Land？</h5>
      <p><a>Evolution Land</a> is a blockchain game that supports cross-chain virtual operation. Players can buy and sell land, dig elements for them, build buildings, make items, etc., Play to earn.</p>

      <h5>6. What’s iBox？</h5>
      <p><a>IBox</a> (ibox.com) is the world's leading digital collection e-commerce platform, positioned at the issue and circulation of high-end digital collections, where users not only can purchase the NFT products, but also buy and sell in the secondary market.</p>

      <h5>7. Who is TKSX？</h5>
      <p>TKSX is the first NFT fashion brand in Asia. It was established in 2020. Since its establishment, the brand has signed hundreds of young artists. Artists cover graffiti, rap, tattoos, designer toys, ACGN and other fields. TKSX is committed to creating  unique and valuable collections.</p>
    </div>
    <div class="mt-6">
      <h3>About the event:</h3>

      <h5>1. How to participate the event？</h5>
      <p>Click on the <a>form link</a> to participate</p>

      <h5>2. How do I know if I won the airdrop?</h5>
      <p>Please check if you have won the NFT mystery box in the official website reward announcement on 2021/7/23(UTC). You will see the NFT airdrop in your Heco wallet address in the next 3 days. Then you can view that in the personal center of <a>IBox , Evolution Land</a> after binding the Heco wallet.</p>
    </div>
  </div>
</template>


<style scoped lang="scss">
.table-box {
  border-width: 1px;
  border-style: solid;
  border-color: #E6E6E6;
  border-radius: 10px;
  overflow: hidden;
}
table {
  width: 100%;
  border-collapse: separate;
  td, th {
    @apply py-1 px-2 md:py-2.5 md:px-5;
  }
  th {
    background: #F2F5F7;
    color: #033666;
    @apply text-sm font-bold;
    @apply text-left;
  }
  td {
    color: rgba(37, 62, 111, 0.85);
    @apply bg-white text-xs;
    border-width: 1px 1px 0 0;
    border-style: solid;
    border-color: #E6E6E6;
    &:last-child {
      border-right-width: 0;
    }
  }
}

.about-note {
  h3 {
    color: #033666;
    @apply text-lg leading-7 font-semibold;
    @apply mb-1.5;
  }
  p {
    color: rgba(37, 62, 111, 0.85);
    @apply text-sm leading-5;
    & + h5 {
      @apply mt-3;
    }
  }

  h5 {
    color: #033666;
    @apply font-medium;
    @extend p;
    @apply mb-1.5;
  }
  a {
    color: #2b8cff;
    @apply cursor-pointer;
  }
}

</style>
