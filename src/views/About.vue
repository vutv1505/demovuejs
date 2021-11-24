<template>
  <h1>Create Page</h1>
  <form>
    <table class="d-grid">
      <tr>
        <td> 
          <label>productCode</label>
        </td>
        <td> 
          <input name="productCode" v-model="model.productCode">
        </td>
      </tr>
      <tr>
        <td> 
          <label>handleProductCode</label>
        </td>
        <td> 
          <input name="handleProductCode" v-model="model.handleProductCode">
        </td>
      </tr>
      <tr>
        <td> 
          <label>divisionName</label>
        </td>
        <td> 
          <input name="divisionName" v-model="model.divisionName">
        </td>
      </tr>
      <tr>
        <td> 
          <label>productNumber</label>
        </td>
        <td> 
          <input name="productNumber" v-model="model.productNumber">
        </td>
      </tr>
      <tr>
        <td> 
          <label>productName</label>
        </td>
        <td> 
          <input name="productName" v-model="model.productName">
        </td>
      </tr>
    </table>
    <a href="#" v-on:click="createPost">SUBMIT</a>
  </form>
</template>
<script>
import PostService from '@/api/post.service'

export default {
  data() {
    return {
      model: {
        accountID: "1",
        productCode: "",
        applicabilityEndDate: "2022-12-01T00:00:00.000Z",
        applicabilityStartDate: "2021-01-01T00:00:00.000Z",
        handleProductCode: "",
        divisionName: "",
        productNumber: "",
        productName: "productName10"
      }
    }
  },
  created() {},
  methods: {
    createPost() {
      PostService.save(this.model)
        .then(() => {
          console.log('create successfull!')
        })
        .catch(error => {
          console.log(error)
        })
    },
  }
}
</script>