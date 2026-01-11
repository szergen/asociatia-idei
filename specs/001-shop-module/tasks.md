# Implementation Tasks: E-Commerce Shop Module

**Feature Branch**: `001-shop-module`
**Spec**: [specs/001-shop-module/spec.md](spec.md)
**Plan**: [specs/001-shop-module/plan.md](plan.md)

## Phase 1: Setup
*Goal: Initialize project dependencies and environment for shop module.*

- [ ] T001 Install Stripe dependencies in `apps/website` (`npm install stripe @stripe/stripe-js`)
- [ ] T002 Define environment variables types in `apps/website/src/env.d.ts` (STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
- [ ] T003 Create `apps/website/src/lib/stripe/client.ts` for Stripe client-side helper
- [ ] T004 Create `apps/website/src/lib/stripe/server.ts` for Stripe server-side instance initialization
- [ ] T005 Create `apps/website/src/context/CartContext.tsx` with basic types and provider shell
- [ ] T006 Add "product" model definition file to `apps/website/src/builder-registry.ts` (or equivalent config)

## Phase 2: Foundational
*Goal: Implement core shared utilities and state management required for all stories.*

- [ ] T007 Implement `CartContext` logic: `addToCart`, `removeFromCart` with local state
- [ ] T008 [P] Implement `useLocalStorage` hook or utility in `CartContext` for persistence
- [ ] T009 [P] Create `CartDrawer` component structure in `apps/website/src/components/shop/CartDrawer.tsx`
- [ ] T010 [P] Create `ProductCard` component in `apps/website/src/components/shop/ProductCard.tsx` (using shared-ui props)
- [ ] T011 Update `CartContext` to expose `cartItems`, `totalPrice`, `isOpen`, `openCart`, `closeCart`

## Phase 3: User Story 1 - Product Discovery (Priority: P1)
*Goal: Users can browse and view products.*

- [ ] T012 [US1] Create shop main page at `apps/website/src/app/shop/page.tsx`
- [ ] T013 [US1] Implement Builder.io fetching logic in `apps/website/src/app/shop/page.tsx` for product list
- [ ] T014 [US1] Create product detail page at `apps/website/src/app/shop/[slug]/page.tsx`
- [ ] T015 [US1] Implement Builder.io fetching logic for single product in `apps/website/src/app/shop/[slug]/page.tsx`
- [ ] T016 [US1] [P] Style `ProductCard` grid layout in shop main page
- [ ] T017 [US1] [P] Implement product gallery and info layout in product detail page

## Phase 4: User Story 2 - Cart Management (Priority: P1)
*Goal: Users can manage cart contents.*

- [ ] T018 [US2] Connect `ProductCard` "Add to Cart" button to `CartContext.addToCart`
- [ ] T019 [US2] Connect `ProductDetail` "Add to Cart" button to `CartContext.addToCart` with quantity selector
- [ ] T020 [US2] Implement `CartDrawer` UI listing items from context
- [ ] T021 [US2] [P] Implement quantity adjustment controls (+/-) in `CartDrawer`
- [ ] T022 [US2] [P] Implement remove item button in `CartDrawer`
- [ ] T023 [US2] Add Cart Icon component to header (or layout) triggering `openCart`
- [ ] T024 [US2] Verify localStorage persistence survives page reload (Manual verification step)

## Phase 5: User Story 3 - Checkout Process (Priority: P1)
*Goal: Users can securely checkout via Stripe.*

- [ ] T025 [US3] Create API route `apps/website/src/app/api/checkout/route.ts`
- [ ] T026 [US3] Implement Stripe Session creation logic in API route (validating items against Stripe)
- [ ] T027 [US3] Implement `handleCheckout` function in `CartDrawer` calling `/api/checkout`
- [ ] T028 [US3] Handle redirection to Stripe URL from frontend
- [ ] T029 [US3] Create success page `apps/website/src/app/shop/success/page.tsx`
- [ ] T030 [US3] Implement "Clear Cart" logic on success page mount

## Phase 6: User Story 4 - Order Confirmation (Priority: P2)
*Goal: System acknowledges orders via Webhooks.*

- [ ] T031 [US4] Create API route `apps/website/src/app/api/webhooks/stripe/route.ts`
- [ ] T032 [US4] Implement Stripe signature verification in webhook route
- [ ] T033 [US4] Handle `checkout.session.completed` event and log order details
- [ ] T034 [US4] Configure local webhook forwarding (instructions in README/Quickstart)

## Final Phase: Polish
*Goal: UI refinement and final integration checks.*

- [ ] T035 [P] Add loading states to Product Pages (skeleton loaders)
- [ ] T036 [P] Add loading state to "Checkout" button while API request is pending
- [ ] T037 [P] Improve empty cart state in `CartDrawer`
- [ ] T038 Review all styles for mobile responsiveness
- [ ] T039 Run final manual test of full flow: Product -> Cart -> Checkout -> Success

## Dependencies
1. Setup -> Foundational
2. Foundational -> US1 (Product Discovery)
3. Foundational -> US2 (Cart Management)
4. US2 -> US3 (Checkout) - Need cart items to checkout
5. US3 -> US4 (Order Confirmation) - Need checkout to trigger webhooks

## Parallel Execution Opportunities
- **UI vs Logic**: `ProductCard` (T010) and `CartDrawer` (T009) UI can be built while `CartContext` (T007) logic is being finalized.
- **Pages**: Shop Listing (T012) and Product Detail (T014) can be built in parallel.
- **Backend vs Frontend**: Stripe API route (T025) can be implemented while Frontend Checkout button (T027) is being built.

## Implementation Strategy
- **MVP (P1)**: Complete Phases 1, 2, 3, 4, 5. This delivers a working shop.
- **Enhanced (P2)**: Complete Phase 6. This adds backend automation.
- Start with **T005-T007** (Cart Core) as it's the central nervous system of the shop.
