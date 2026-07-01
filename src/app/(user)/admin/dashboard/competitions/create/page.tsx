import React from 'react';
import LegacyWizardPage from './LegacyWizardPage';

export default function CreateCompetitionPage() {
  // Always return the Wizard page to create a new competition.
  // The studio is used for editing existing competitions.
  return <LegacyWizardPage />;
}
