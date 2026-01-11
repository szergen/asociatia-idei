# Research: E-Commerce Shop Module

**Status**: Completed
**Date**: 2026-01-11

## Decisions & Rationale

### 1. State Management: React Context + LocalStorage

**Decision**: Use React Context for application state and `localStorage` for persistence.
**Rationale**:

- **Simplicity**: No need for Redux/Zustand for this scope (simple cart list).
- **Persistence**: `localStorage` meets the requirement for surviving tab closes.
- **Availability**: Standard browser API, zero dependencies.
  **Alternatives Considered**:
- _Cookies_: Adds overhead to every request, size limits, harder to manage on client.
- _SessionStorage_: Lost on tab close (violates requirement).
- _Redux_: Overkill for a simple cart.

### 2. Payment Integration: Stripe Hosted Checkout

**Decision**: Use Stripe Hosted Checkout (redirect flow).
**Rationale**:

- **Security**: PCI compliance is handled by Stripe.
- **Speed**: No need to build custom checkout forms.
- **Maintenance**: Stripe handles payment method updates and UI optimization.
  **Alternatives Considered**:
- _Custom Stripe Elements_: More control, but higher development effort and security burden.

### 3. CMS Integration: Builder.io Data Models

**Decision**: Create a "product" model in Builder.io.
**Rationale**:

- **Flexibility**: Marketing team can edit descriptions/images easily.
- **Performance**: Static generation (SSG) for product pages ensures fast load times.
- **Integration**: Existing project already uses Builder.io.

### 4. Validation Strategy: Server-Side Verification

**Decision**: Validate cart items against Stripe API before session creation.
**Rationale**:

- **Security**: Prevents "inspect element" price tampering.
- **Consistency**: Ensures the price user sees matches what is charged.
- **Hybrid Flow**: Use CMS for display speed, Stripe for financial truth.

## Unknowns Resolved

- **Unknown**: Stripe API version compatibility?
  - **Resolution**: Will use latest stable API version compatible with the Node.js SDK.
- **Unknown**: Shared UI component readiness?
  - **Resolution**: Will assume standard `Button` and `Modal` components exist in `packages/shared-ui` or create wrappers if needed.
