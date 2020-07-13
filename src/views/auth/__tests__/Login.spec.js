import Login from "@/views/auth/Login"
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuelidate from 'vuelidate'

const localVue = createLocalVue()
localVue.use(Vuelidate)

const mockStore = {
    getters: {
        error: ""
    },
    dispatch: jest.fn()
}

describe("Login", () => {

    let wrapper, form, emailInput, passwordInput, button

    beforeEach(() => {
        wrapper = shallowMount(Login, {
            mocks: {
                $store: mockStore
            }, localVue
        })
        form = wrapper.find("form")
        emailInput = wrapper.findAll("input").at(0)
        passwordInput = wrapper.findAll("input").at(1)
        button = wrapper.find("button")
    })

    it("should render with no errors and clean and empty inputs", () => {

        const error = wrapper.find("small")

        expect(error.exists()).toBe(false)
        expect(wrapper.vm.$v.credentials.email.$dirty).toEqual(false)
        expect(wrapper.vm.$v.credentials.email.$model).toEqual("")
        expect(wrapper.vm.$v.credentials.password.$dirty).toEqual(false)
        expect(wrapper.vm.$v.credentials.password.$model).toEqual("")
    })

    it("should pass validation when email and password are properly filled", async () => {
        
        emailInput.setValue("test@test.com")
        passwordInput.setValue("password")
        await wrapper.vm.$nextTick()

        const error = wrapper.find("small")

        expect(wrapper.vm.$v.$invalid).toBe(false)
        expect(error.exists()).toBe(false)
        expect(button.attributes("disabled")).toBeUndefined()
    })

    it("should fail validation when email is empty", async () => {
        
        emailInput.setValue("")
        passwordInput.setValue("password")
        await wrapper.vm.$nextTick()

        const error = wrapper.find("small")
        
        expect(wrapper.vm.$v.credentials.email.required).toBe(false)
        expect(wrapper.vm.$v.$invalid).toBe(true)
        expect(error.text()).toBe("Email cannot be empty")
        expect(button.attributes("disabled")).toBeDefined()
    })

    it("should fail validation when email is not valid", async () => {
        
        emailInput.setValue("invalid.email")
        passwordInput.setValue("password")
        await wrapper.vm.$nextTick()

        const error = wrapper.find("small")
        
        expect(wrapper.vm.$v.credentials.email.email).toBe(false)
        expect(wrapper.vm.$v.$invalid).toBe(true)
        expect(error.text()).toBe("Must be a valid email")
        expect(button.attributes("disabled")).toBeDefined()
    })

    it("should fail validation when password is empty", async () => {
        
        emailInput.setValue("test@test.com")
        passwordInput.setValue("")
        await wrapper.vm.$nextTick()

        const error = wrapper.find("small")
        
        expect(wrapper.vm.$v.credentials.password.required).toBe(false)
        expect(wrapper.vm.$v.$invalid).toBe(true)
        expect(error.text()).toBe("Password cannot be empty")
        expect(button.attributes("disabled")).toBeDefined()
    })

    it("should fail validation when password has less than 5 characters", async () => {
        
        emailInput.setValue("test@test.com")
        passwordInput.setValue("tiny")
        await wrapper.vm.$nextTick()

        const error = wrapper.find("small")
        
        expect(wrapper.vm.$v.credentials.password.minLength).toBe(false)
        expect(wrapper.vm.$v.$invalid).toBe(true)
        expect(error.text()).toBe("Password must have at least 5 characters")
        expect(button.attributes("disabled")).toBeDefined()
    })

    it("should call login on submit with the expected credentials", async () => {

        const expectedCredentials = {
            email: "test@test.com",
            password: "password"
        }

        emailInput.setValue(expectedCredentials.email)
        passwordInput.setValue(expectedCredentials.password)
        await wrapper.vm.$nextTick()

        form.trigger("submit")
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.credentials).toEqual(expectedCredentials)
        expect(mockStore.dispatch).toHaveBeenCalledWith("logIn", wrapper.vm.credentials)
    })

    it("should show an error from the store", () => {

        const error = "Something bad happened"
        wrapper = shallowMount(Login, {
            mocks: {
                $store: {
                    getters: {
                        error
                    }
                }
            }, localVue
        })

        const errorSmall = wrapper.find("small")
        expect(errorSmall.text()).toBe(error)
    })
})