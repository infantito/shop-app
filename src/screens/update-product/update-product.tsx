import * as React from 'react'
import { View, ScrollView, Alert, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import type { RootState } from '~typings/store'
import type { UpdateProductProps } from '~typings/screens'
import { HeaderButton, Input } from '~components'
import { Colors, isAndroid } from '~constants'
import updateProductStyles from './update-product.styles'

const UpdateProduct = (props: UpdateProductProps) => {
  const { route, navigation } = props

  const { productId } = route.params

  const editedProduct = useSelector((state: RootState) =>
    state.product.userProducts.find(product => product.id === productId)
  )

  const [state, setState] = React.useState({
    isLoading: false,
    error: null as string,
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
    formIsValid: Boolean(editedProduct?.id),
  })

  const updater = (newState: Partial<typeof state>) => {
    setState(prevState => ({ ...prevState, ...newState }))
  }

  const dispatch = useDispatch()

  const handleSubmit = React.useCallback(async () => {
    if (!state.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [{ text: 'Okay' }])

      return
    }

    updater({ error: null, isLoading: true })

    let error = state.error

    try {
      if (editedProduct) {
        console.log('dispatch: edit product')
      } else {
        console.log('dispatch: create product')
      }

      navigation.goBack()
    } catch (caughtError: InstanceType<Error>) {
      error = caughtError.message
    }

    updater({ error, isLoading: false })
  }, [dispatch, productId, state])

  const handleInputChange = (inputIdentifier: string, inputValue: string, inputValidity: boolean) => {
    updater({
      inputValues: {
        ...state.inputValues,
        [inputIdentifier]: inputValue,
      },
      inputValidities: {
        ...state.inputValidities,
        [inputIdentifier]: inputValidity,
      },
    })
  }

  React.useEffect(() => {
    if (state.error) {
      Alert.alert('An error occurred!', state.error, [{ text: 'Okay' }])
    }
  }, [state.error])

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: productId ? 'Edit Product' : 'Add Product',
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="Save" iconName={isAndroid ? 'md-checkmark' : 'ios-checkmark'} onPress={handleSubmit} />
        </HeaderButtons>
      ),
    })
  }, [navigation])

  if (state.isLoading) {
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
            keyboardType="default"
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
