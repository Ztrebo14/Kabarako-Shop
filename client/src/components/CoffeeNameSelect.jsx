import { useFormikContext } from 'formik'
import React from 'react'
import MySelect from './MySelect'

const CoffeeNameSelect = () => {
    const { values } = useFormikContext()

return values.coffeeType === 'arabica' ? (
    <MySelect label='Coffee Name:' name='coffeeName'>
          <option value="">Select a coffee name</option>
          <option value="ethiopian">Ethiopian</option>
          <option value="colombian">Colombian</option>
          <option value="yirgacheffe">Yirgacheffe</option>
    </MySelect>
    ) : null
}

export default CoffeeNameSelect