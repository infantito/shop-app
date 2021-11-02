import * as React from 'react'
import { View, ScrollView, Alert, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import type { Product } from '~typings/assets/data'
import type { RootState } from '~typings/store'
import type { UpdateProductProps } from '~typings/screens'
import { createProduct, updateProduct } from '~store'
import { HeaderButton, Input } from '~components'
import { Colors, isAndroid } from '~constants'
import updateProductStyles from './update-product.styles'

const UpdateProduct = (props: UpdateProductProps) => {
  const { route, navigation } = props

  const { productId } = route.params || {}

  const {
    product: editedProduct,
    userId,
    token,
    status,
  } = useSelector(({ auth, product }: RootState) => {
    return {
      userId: auth.user.id,
      token: auth.token,
      product: product.userProducts.find(item => item.id === productId),
      status: product.status,
    }
  })

  const [state, setState] = React.useState({
    inputValues: {
      title: editedProduct?.title ?? '',
      imageUrl: editedProduct?.imageUrl ?? '',
      description: editedProduct?.description ?? '',
      price: editedProduct?.price ?? '',
    },
    inputValidities: {
      title: Boolean(editedProduct?.title),
      imageUrl: Boolean(editedProduct?.imageUrl),
      description: Boolean(editedProduct?.description),
      price: Boolean(editedProduct?.price),
    },
  })

  const updater = React.useMemo(
    () => (newState: Partial<typeof state>) => {
      setState(prevState => ({
        ...prevState,
        ...newState,
        inputValues: { ...prevState.inputValues, ...newState.inputValues },
        inputValidities: { ...prevState.inputValidities, ...newState.inputValidities },
      }))
    },
    [setState]
  )

  const dispatch = useDispatch()

  const handleSubmit = React.useCallback(async () => {
    const isFormValid = Object.values(state.inputValidities).every(Boolean)

    if (!isFormValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [{ text: 'Okay' }])

      return
    }

    const { inputValues } = state

    const payload = {
      ownerId: userId,
      imageUrl: inputValues.imageUrl,
      title: inputValues.title,
      description: inputValues.description,
      price: Number(inputValues.price),
    } as Product

    if (editedProduct) {
      payload.id = editedProduct.id

      dispatch(updateProduct({ product: payload, token }))
    } else {
      dispatch(createProduct({ product: payload, token }))
    }

    navigation.goBack()
  }, [dispatch, productId, state])

  const handleInputChange = React.useCallback(
    (inputIdentifier: string, inputValue: string, inputValidity: boolean) => {
      updater({
        inputValues: {
          [inputIdentifier]: inputValue,
        } as typeof state.inputValues,
        inputValidities: {
          [inputIdentifier]: inputValidity,
        } as typeof state.inputValidities,
      })
    },
    [updater]
  )

  React.useEffect(() => {
    if (status === 'error') {
      Alert.alert('An error occurred!', '500', [{ text: 'Okay' }])
    }
  }, [status])

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: productId ? 'Edit Product' : 'Add Product',
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="Save" iconName={isAndroid ? 'md-checkmark' : 'ios-checkmark'} onPress={handleSubmit} />
        </HeaderButtons>
      ),
    })
  }, [navigation, handleSubmit])

  if (status === 'creating' || status === 'updating') {
    return (
      <View style={updateProductStyles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={updateProductStyles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={handleInputChange}
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="url"
            returnKeyType="next"
            onInputChange={handleInputChange}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={handleInputChange}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={handleInputChange}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default UpdateProduct
