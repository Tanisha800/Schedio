/**
 * SettingsHeader
 *
 * Displays a common title and description format for each specific settings tab
 * (e.g., Profile, Preferences, Security, Danger Zone).
 *
 * Props:
 *   title       - Main heading text
 *   description - Subtitle explaining the section
 */
export default function SettingsHeader({ title, description }) {
    return (
        <div className="pb-5 border-b border-border mb-6">
            <h2 className="text-xl font-semibold text-foreground tracking-tight">{title}</h2>
            <p className="text-sm text-muted-foreground mt-1">
                {description}
            </p>
        </div>
    );
}
