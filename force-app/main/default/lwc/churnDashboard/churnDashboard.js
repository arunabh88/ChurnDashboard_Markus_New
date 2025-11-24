import { LightningElement, wire, track } from 'lwc';
import getDashboard from '@salesforce/apex/ChurnDashboardController.loadDashboard';

const BADGE_MAP = {
    critical: 'slds-badge slds-badge_inverse slds-theme_error',
    high: 'slds-badge slds-theme_warning',
    medium: 'slds-badge',
    low: 'slds-badge slds-badge_lightest'
};

const PRIORITY_MAP = {
    'Save First': 'slds-badge slds-theme_success',
    'Needs Attention': 'slds-badge slds-theme_warning',
    'Low ROI': 'slds-badge slds-theme_inverse'
};

const METRIC_VARIANT_MAP = {
    accuracy: 'success',
    precision: 'brand',
    recall: 'warning',
    f1: 'base'
};

export default class ChurnDashboard extends LightningElement {
    @track dashboard;
    @track error;

    @wire(getDashboard)
    wiredDashboard({ data, error }) {
        if (data) {
            this.dashboard = this.prepareDashboard(data);
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.dashboard = undefined;
        }
    }

    get errorMessage() {
        if (!this.error) {
            return '';
        }
        if (Array.isArray(this.error.body)) {
            return this.error.body.map((err) => err.message).join(', ');
        }
        if (this.error.body && typeof this.error.body.message === 'string') {
            return this.error.body.message;
        }
        return JSON.stringify(this.error);
    }

    prepareDashboard(data) {
        const journeyPhases = data.journeyPhases.map((phase) => ({
            ...phase,
            churnLabel: `${phase.churn}% churn`
        }));

        const riskBands = data.riskBands.map((band) => ({
            ...band,
            value: `${band.valueLabel}`
        }));

        const matrix = data.matrix.map((row) => ({
            ...row,
            badgeClass: BADGE_MAP[row.severityVariant] || BADGE_MAP.medium
        }));

        const segments = data.segments.map((segment) => ({
            ...segment,
            priorityBadge: PRIORITY_MAP[segment.priority] || 'slds-badge'
        }));

        const actions = {
            autoAction: data.actionCenter.autoAction,
            items: data.actionCenter.items.map((item) => ({
                ...item,
                liftLabel: `+${item.lift}%`
            }))
        };

        const experiments = data.experiments.map((experiment) => ({
            ...experiment,
            roiLabel: `ROI ${experiment.roi}`,
            lift: experiment.liftPercentage
        }));

        const modelMetrics = data.modelPerformance.metrics.map((metric) => ({
            ...metric,
            variant: METRIC_VARIANT_MAP[metric.type] || 'base'
        }));

        const agentforceOptions = data.agentforce.options;

        return {
            summary: data.summary,
            journeyPhases,
            journeyProgress: {
                current: data.journeyProgress.current,
                currentRing: parseFloat(data.journeyProgress.current),
                goal: data.journeyProgress.goal,
                highestRisk: data.journeyProgress.highestRisk
            },
            riskBands,
            matrix,
            segments,
            projectedRevenue: data.projectedRevenue,
            actions,
            experiments,
            modelMetrics,
            aiAlert: data.aiAlert,
            agentforceOptions
        };
    }
}



