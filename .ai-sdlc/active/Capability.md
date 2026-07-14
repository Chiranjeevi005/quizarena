# Capability Planning Template

## Capability Name
Razorpay Commerce Integration

## Business Goal
Enable learners to pay for paid competitions using Razorpay.

## User Story
As a learner, I want to securely pay the entry fee using standard payment methods so that I can enroll in premium competitions.

## Launch Priority
P0

## Dependencies
- Assessment Runtime
- Evaluation

## Definition of Done
- Frontend initiates Razorpay modal for PAID competitions.
- Webhook safely verifies signature via raw body and updates Registration state to ENROLLED.
- No TypeScript or lint errors.

## Capability Checklist
- [x] Database
- [x] API
- [x] Repository
- [x] Service
- [x] Validation
- [x] Authorization
- [x] Frontend
- [x] Responsive Design
- [x] Loading States
- [x] Error States
- [x] Mobile Review
- [x] Security Review
- [x] Architecture PASS
- [x] QA PASS
- [x] Documentation Updated
- [x] Git Commit

## Architecture Constraints
- Avoid JSON parsing before signature validation in webhooks.

## Expected Outcomes
- No TypeScript errors, QA PASS, Business workflow completes.

## Implementation Outputs
- razorpay.provider.ts updated
- webhook/razorpay/route.ts updated
- competitions/[id]/page.tsx updated

## Evidence Required
- Build outputs, UI screenshots.
