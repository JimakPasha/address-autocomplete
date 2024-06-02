### 1. Please share any functionality you wish you could have completed in the previous step and how you would have completed it.

**First, I will talk about what first came to my mind as an improvement beyond implementing the main technical task, and I went ahead and implemented and enhanced it right away. Now the application already includes these additional functionalities:**

- **Debounce.** I added a debounce function to optimize the application's performance. This function delays the processing of user input, reducing the number of API calls and improving the efficiency of the autocomplete feature. It enhances user experience by preventing excessive network requests and ensuring smoother interactions.

- **Loaders for pending request.** I've handled the pending states in the server requests to make it clearer to the user what state the application is currently in. I've done this for both the POST method and a small loader in the options for the GET request /autocomplete.

- **Errors.** I've divided validation errors a bit. The first type is when a field doesn't match what the user can select from the options, and there's also a separate type of error if the user submits the form with empty input(s).

- **Input Mask.** Since all fields for addresses from the /autocomplete endpoint return values with each word capitalized, I implemented a feature that automatically capitalizes the user's input to make it easier for them to enter values without worrying about case sensitivity. This also ensures more accurate server-side searches. I added a checkbox to the form that enables/disables this functionality. This was primarily done to demonstrate to the reviewer that this feature exists and can be removed if unnecessary.

- **Scroll.** Since the dropdown list can be very large, I set a fixed height for the list and enabled scrolling. Additionally, I styled it.

- **Refactoring, Structure, and Code Style.** I decided to bring the code to a more consistent state. I used named imports everywhere, arrow functions, and moved potentially reusable functions, constants, and components into separate files. I separated the display from the logic a bit by moving useGetFormData into a separate hook where all the logic resides, while the App component is only responsible for rendering. I also extracted reusable components such as AutocompleteInput, Checkbox, Tooltip, ScreenLoader, and InlineLoader. I understand that for an application with a single form, this might be excessive, but I aimed to show that the structure is scalable and, in doing so, provided a slight structure to the application.

Now I will explain what else I'd improve:

- **Validation-1.** I might add a special error if the value doesn't match what is in the options. Currently, this error exists and uses a pattern attribute, but I'd add custom error messaging for it.

- **Validation-2.** Currently, validation occurs onChange. If necessary, it could be changed to onBlur.

- **Accessibility.** I think it'd be beneficial to add the ability to navigate options using the tab key. Currently, when tabbing, the options are't considered interactive elements and cannot be used with the keyboard

- **Request Caching.** It might be interesting to implement this. Currently, if you type 'San Diego', then quickly delete the 'o' and type it again, a new request is sent with the value 'San Diego'. Although it doesn't result in a significant performance gain, such caching can sometimes be useful.

- **Long option names.** If an option name is very long, it should wrap to a new line. It might be worth considering whether to truncate these names or increase the width of the option elements.

- **Refactoring.** The requests could be moved to a separate api folder and handled by individual functions. Additionally, base_url and endpoints could be stored as separate constants.

----

### 2. Discuss how the delay in validating the address fields might affect user experience, and provide strategies for minimizing its impact.

The delay in validating the address fields might negatively impact the user experience, especially if it's perceived as lengthy.
Several strategies for minimizing the impact of delays, which I've already implemented and described above in the Debounce, Loaders for pending request, and Input Mask sections. 
- help reduce the number of unnecessary requests (Debounce)
- make requests more accurate (Input Mask)
- provide users with more clarity about the application's state, which can also reduce server load since an understanding user makes fewer unnecessary actions (Loaders for pending request)
- one strategy that I haven't implemented but described in the previous section is (Request Caching). This can also reduce unnecessary server interactions.
- Additionally, it'd be useful to thoroughly consider and implement another type of validation, for instance, ensuring that values not present or not matching the initial list are not sent to the server.

----

### 3. Explain how you would handle more complex form validation scenarios, such as conditional validation based on the values of other fields. For example, if we had input fields for adding the users’ address, and the postal code format needed to change according to the country selection (5 digits for the US and 6 letters and numbers separated by a space for Canada).

- In the case of the user address and postal code format, I'd add additional validation logic that analyzes the country selection and applies corresponding rules for formatting the postal code.

- Field dependency. Creating a mechanism linking form fields. For example, when the user selects a country, the change event of the country field will trigger a function to update the validation rules for the postal code field.

- Dynamic validation rule update. Implementing a mechanism for dynamically updating validation rules based on changes in other field values. For instance, selecting the USA would limit the postal code format to 5 digits, while choosing Canada would require 6 characters, including letters and digits separated by a space.

- Error messages. When the form is incorrectly filled out according to conditional checks, displaying error messages that clearly explain what needs to be corrected to the user is necessary.

- If there are many forms, each requiring extensive validation, and these fields are often interconnected and dependent on each other, to avoid a large amount of boilerplate code and speed up development, it'd be beneficial to use libraries for form management and validation, such as react-hooks-form for forms and yup for validation. Yup offers a wide range of functions that facilitate handling forms with complex field dependencies.