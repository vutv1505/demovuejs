<template>
  <h1>Home Page</h1>

  <table>
    <tr>
      <td>
        accountID
      </td>
      <td>
        productCode
      </td>
      <td>
        handleProductCode
      </td>
      <td>
        divisionName
      </td>
      <td>
        productNumber
      </td>
      <td>
        productName
      </td>
      <td>
        action
      </td>
    </tr>
    <tr v-for="(item, index) of tableItems" :key="index">
      <td>
        {{item.accountID}}
      </td>
      <td>
        {{item.productCode}}
      </td>
      <td>
        {{item.handleProductCode}}
      </td>
      <td>
        {{item.divisionName}}
      </td>
      <td>
        {{item.productNumber}}
      </td>
      <td>
        {{item.productName}}
      </td>
      <td>
        <button v-on:click="deletePost(item.productCode)"> delete </button>
      </td>
    </tr>
  </table>
</template>

<script>
import PostService from '@/api/post.service'

export default {
  data() {
    return {
      tableItems: [
        {
          "accountID": "1",
          "productCode": "0035H",
          "applicabilityEndDate": "2022-12-01T00:00:00.000Z",
          "applicabilityStartDate": "2021-01-01T00:00:00.000Z",
          "handleProductCode": "2",
          "divisionName": "",
          "productNumber": 1251,
          "productName": "productName10"
        },
        {
          "accountID": "1",
          "productCode": "0030H",
          "applicabilityEndDate": "2022-12-01T00:00:00.000Z",
          "applicabilityStartDate": "2021-01-01T00:00:00.000Z",
          "handleProductCode": "2",
          "divisionName": "",
          "productNumber": 1251,
          "productName": "productName10"
        },
        {
          "accountID": "1",
          "productCode": "0040H",
          "applicabilityEndDate": "2022-12-01T00:00:00.000Z",
          "applicabilityStartDate": "2021-01-01T00:00:00.000Z",
          "handleProductCode": "2",
          "divisionName": "",
          "productNumber": 1251,
          "productName": "productName10"
        },
      ]
    }
  },
  created() {
    this.loadPostList()
  },
  methods: {
    loadPostList() {
      PostService.getList()
        .then(({ data }) => {
          this.tableItems = data
        })
        .catch(error => {
          console.log(error)
        })
    },
    deletePost(productCode) {
      console.log(productCode)
      PostService.delete(productCode)
        .then(() => {
          console.log('deleted successful')
          this.loadPostList()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>