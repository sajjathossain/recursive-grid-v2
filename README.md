# Recursive grid v2

2nd iteration of [react recursive grid](https://github.com/sajjathossain/react-recursive-grid)

## changes:

- it uses react use state to maintain component level state instead of using use ref on the app component and passing down the state to the child component.
- as it uses use state, it does not need to maintain another use state on the app level to trigger dom update. it happens automatically when the state changes which was not present on the previous app.
