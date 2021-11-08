An web-app which allows user to login/signup and upload files to s3 and manage those files.

To run the project.
1. Clone the repo.
2. Run `yarn` to add missing dependencies
3. Add environment variables mentioned in `.env` file.(each explained with comment)
4. Run `yarn dev`

Some of the parts of this app, along with benefits:

 1. **Typescript** for strongly typed code and better developer experience.
 2. **Prisma Database client** which is also an ORM with Typescript support(DB: postgres)
 3. **Chakra UI**: Pre-made Accessible WAI-ARIA complaint components for implementing Form-components.
 4. **Tailwind Css**. Utility first library for rapidly building components & layouts. Super fast and pragmatic way of building react components & layouts.
 5. **Mobx state tree**: Centralised store for managing file assets and side-effects. Typescript support.
 6. Authentication with **cookies**. storing id in cookies so subsequent requests can be authenticated and authorised.
 7. Connection with **S3** bucket for storing files.

