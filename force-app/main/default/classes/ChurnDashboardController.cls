public with sharing class ChurnDashboardController {
    @AuraEnabled(cacheable=true)
    public static DashboardPayload loadDashboard() {
        DashboardPayload payload = new DashboardPayload();

        payload.summary = new DashboardPayload.Summary(
            'Trial-to-New conversion at 30%. Improving early engagement by 10% could grow Established base by +120K annually.',
            '100 trials/day',
            '30',
            '19'
        );

        payload.journeyPhases = new List<DashboardPayload.JourneyPhase>{
            new DashboardPayload.JourneyPhase('Trial Users', '3.00K', '30 days', '45%', 70),
            new DashboardPayload.JourneyPhase('New Users', '2.19K', '90 days', '69%', 20),
            new DashboardPayload.JourneyPhase('Established Users', '1.29M', 'Ongoing', '84%', 0.85)
        };

        payload.journeyProgress = new DashboardPayload.JourneyProgress(0.85, 0.57,
            new DashboardPayload.RiskHighlight('Trial Users (70% churn)', 'Focus retention plays on onboarding and activation.', 70));

        payload.riskBands = new List<DashboardPayload.RiskBand>{
            new DashboardPayload.RiskBand('High Risk', 'Immediate outreach required'),
            new DashboardPayload.RiskBand('Medium Risk', 'Monitor weekly engagement trends'),
            new DashboardPayload.RiskBand('Low Risk', 'Sustain loyalty motions')
        };

        payload.matrix = new List<DashboardPayload.MatrixRow>{
            new DashboardPayload.MatrixRow('Engagement', 'Drop in live TV hours', 'Usage Logs', 'critical', 24),
            new DashboardPayload.MatrixRow('Billing', 'Payment method expired', 'Payment API', 'high', 18),
            new DashboardPayload.MatrixRow('Sentiment', 'Negative support interactions', 'NLP Analysis', 'high', 16),
            new DashboardPayload.MatrixRow('Experience', 'Buffering incidents increased', 'Quality Metrics', 'medium', 14),
            new DashboardPayload.MatrixRow('Competitor', 'Price comparison searches', 'Web Analytics', 'medium', 13),
            new DashboardPayload.MatrixRow('Loyalty', 'Reduced referral activity', 'CRM Data', 'low', 15)
        };

        payload.segments = new List<DashboardPayload.Segment>{
            new DashboardPayload.Segment('High-value loyalists', '8,400', 76, 620, '3.2×', 'Save First', 'Loyalty discount + exclusive content'),
            new DashboardPayload.Segment('Price-sensitive', '15,200', 83, 180, '2.5×', 'Needs Attention', 'Flexible plan + ad-supported tier'),
            new DashboardPayload.Segment('Content-fatigued', '6,800', 69, 240, '3.1×', 'Save First', 'Recommend new series + personalized playlists'),
            new DashboardPayload.Segment('Tech-frustrated', '4,200', 71, 210, '2.8×', 'Needs Attention', 'Proactive support + device upgrade offer'),
            new DashboardPayload.Segment('Competitive shoppers', '9,600', 88, 150, '2.1×', 'Low ROI', 'Price match + bundle discount')
        };

        payload.projectedRevenue = '1.2M';

        payload.actionCenter = new DashboardPayload.ActionCenter(
            new DashboardPayload.AutoAction('Offer Loyalty Discount', 12),
            new List<DashboardPayload.ActionItem>{
                new DashboardPayload.ActionItem('Launch Re-engagement Campaign', '“Because you liked...” personalized content recommendations', 18),
                new DashboardPayload.ActionItem('Introduce Ad-supported Plan', 'Lower-cost tier for price-sensitive segments', 15),
                new DashboardPayload.ActionItem('Trigger Exit Feedback', 'One-click survey to understand churn reasons', 8)
            }
        );

        payload.experiments = new List<DashboardPayload.Experiment>{
            new DashboardPayload.Experiment('Free Month Offer', 'Completed', 'Best for price-sensitive users in 30-60 day window', 12, '2.8×', '8,400 participants'),
            new DashboardPayload.Experiment('Personalized Playlist', 'Completed', 'Strong for content fatigue segment, especially drama viewers', 10, '3.1×', '6,200 participants'),
            new DashboardPayload.Experiment('Loyalty Points Program', 'Running', 'Moderate impact, working for established subscribers', 8, '2.5×', '4,100 participants · 67% complete'),
            new DashboardPayload.Experiment('Early Renewal Discount', 'Planned', 'Testing on high-value loyalists segment', 0, 'TBD', 'Configuring cohort')
        };

        payload.modelPerformance = new DashboardPayload.ModelPerformance(
            new List<DashboardPayload.ModelMetric>{
                new DashboardPayload.ModelMetric('Model Accuracy', 96, 'accuracy', 'Balanced across cohorts'),
                new DashboardPayload.ModelMetric('Precision', 94, 'precision', 'True positives maintained'),
                new DashboardPayload.ModelMetric('Recall', 92, 'recall', 'Coverage of churners'),
                new DashboardPayload.ModelMetric('F1 Score', 93, 'f1', 'Overall balance')
            }
        );

        payload.aiAlert = new DashboardPayload.AiAlert(
            'AI Alert: Model Drift Detected',
            'Sentiment data accuracy decreased by 3% over the past 30 days. Retraining recommended to maintain prediction quality.'
        );

        payload.agentforce = new DashboardPayload.AgentforceOptions(new List<String>{
            'Show trial-phase risks',
            'High-value churners',
            'Content engagement gaps',
            'Show high-risk users',
            'Segment analysis',
            'Quick win opportunities'
        });

        return payload;
    }

    public class DashboardPayload {
        @AuraEnabled public Summary summary;
        @AuraEnabled public List<JourneyPhase> journeyPhases;
        @AuraEnabled public JourneyProgress journeyProgress;
        @AuraEnabled public List<RiskBand> riskBands;
        @AuraEnabled public List<MatrixRow> matrix;
        @AuraEnabled public List<Segment> segments;
        @AuraEnabled public String projectedRevenue;
        @AuraEnabled public ActionCenter actionCenter;
        @AuraEnabled public List<Experiment> experiments;
        @AuraEnabled public ModelPerformance modelPerformance;
        @AuraEnabled public AiAlert aiAlert;
        @AuraEnabled public AgentforceOptions agentforce;

        public class Summary {
            @AuraEnabled public String aiInsight;
            @AuraEnabled public String dailyTrials;
            @AuraEnabled public String trialToNew;
            @AuraEnabled public String newToEstablished;

            public Summary(String insight, String daily, String trialNew, String established) {
                aiInsight = insight;
                dailyTrials = daily;
                trialToNew = trialNew;
                newToEstablished = established;
            }
        }

        public class JourneyPhase {
            @AuraEnabled public String name;
            @AuraEnabled public String volume;
            @AuraEnabled public String duration;
            @AuraEnabled public String engagement;
            @AuraEnabled public Decimal churn;

            public JourneyPhase(String phaseName, String phaseVolume, String phaseDuration, String phaseEngagement, Decimal phaseChurn) {
                name = phaseName;
                volume = phaseVolume;
                duration = phaseDuration;
                engagement = phaseEngagement;
                churn = phaseChurn;
            }
        }

        public class JourneyProgress {
            @AuraEnabled public Decimal current;
            @AuraEnabled public Decimal goal;
            @AuraEnabled public RiskHighlight highestRisk;

            public JourneyProgress(Decimal currentValue, Decimal goalValue, RiskHighlight highlight) {
                current = currentValue;
                goal = goalValue;
                highestRisk = highlight;
            }
        }

        public class RiskHighlight {
            @AuraEnabled public String label;
            @AuraEnabled public String description;
            @AuraEnabled public Decimal churnPercentage;

            public RiskHighlight(String highlightLabel, String highlightDescription, Decimal percentage) {
                label = highlightLabel;
                description = highlightDescription;
                churnPercentage = percentage;
            }
        }

        public class RiskBand {
            @AuraEnabled public String label;
            @AuraEnabled public String valueLabel;

            public RiskBand(String bandLabel, String description) {
                label = bandLabel;
                valueLabel = description;
            }
        }

        public class MatrixRow {
            @AuraEnabled public String dimension;
            @AuraEnabled public String signal;
            @AuraEnabled public String source;
            @AuraEnabled public String severityVariant;
            @AuraEnabled public Decimal weight;
            @AuraEnabled public String severity;

            public MatrixRow(String rowDimension, String rowSignal, String rowSource, String severityLevel, Decimal weightPercent) {
                dimension = rowDimension;
                signal = rowSignal;
                source = rowSource;
                severityVariant = severityLevel;
                severity = String.valueOf(severityLevel != null && severityLevel.length() > 0
                    ? severityLevel.substring(0, 1).toUpperCase() + severityLevel.substring(1).toLowerCase()
                    : '');
                weight = weightPercent;
            }
        }

        public class Segment {
            @AuraEnabled public String name;
            @AuraEnabled public String size;
            @AuraEnabled public Decimal churnRisk;
            @AuraEnabled public Integer cltv;
            @AuraEnabled public String roi;
            @AuraEnabled public String priority;
            @AuraEnabled public String play;

            public Segment(String segmentName, String segmentSize, Decimal risk, Integer value, String roiValue, String segmentPriority, String recommendation) {
                name = segmentName;
                size = segmentSize;
                churnRisk = risk;
                cltv = value;
                roi = roiValue;
                priority = segmentPriority;
                play = recommendation;
            }
        }

        public class ActionCenter {
            @AuraEnabled public AutoAction autoAction;
            @AuraEnabled public List<ActionItem> items;

            public ActionCenter(AutoAction headlineAction, List<ActionItem> actionItems) {
                autoAction = headlineAction;
                items = actionItems;
            }
        }

        public class AutoAction {
            @AuraEnabled public String name;
            @AuraEnabled public Decimal lift;

            public AutoAction(String actionName, Decimal actionLift) {
                name = actionName;
                lift = actionLift;
            }
        }

        public class ActionItem {
            @AuraEnabled public String name;
            @AuraEnabled public String description;
            @AuraEnabled public Decimal lift;

            public ActionItem(String itemName, String itemDescription, Decimal itemLift) {
                name = itemName;
                description = itemDescription;
                lift = itemLift;
            }
        }

        public class Experiment {
            @AuraEnabled public String name;
            @AuraEnabled public String status;
            @AuraEnabled public Decimal liftPercentage;
            @AuraEnabled public String roi;
            @AuraEnabled public String participants;
            @AuraEnabled public String summary;

            public Experiment(String experimentName, String experimentStatus, String experimentSummary, Decimal retentionLift, String roiValue, String participantsInfo) {
                name = experimentName;
                status = experimentStatus;
                summary = experimentSummary;
                liftPercentage = retentionLift;
                roi = roiValue;
                participants = participantsInfo;
            }
        }

        public class ModelPerformance {
            @AuraEnabled public List<ModelMetric> metrics;

            public ModelPerformance(List<ModelMetric> modelMetrics) {
                metrics = modelMetrics;
            }
        }

        public class ModelMetric {
            @AuraEnabled public String label;
            @AuraEnabled public Decimal value;
            @AuraEnabled public String type;
            @AuraEnabled public String caption;

            public ModelMetric(String metricLabel, Decimal metricValue, String metricType, String metricCaption) {
                label = metricLabel;
                value = metricValue;
                type = metricType;
                caption = metricCaption;
            }
        }

        public class AiAlert {
            @AuraEnabled public String title;
            @AuraEnabled public String message;

            public AiAlert(String alertTitle, String alertMessage) {
                title = alertTitle;
                message = alertMessage;
            }
        }

        public class AgentforceOptions {
            @AuraEnabled public List<String> options;

            public AgentforceOptions(List<String> agentOptions) {
                options = agentOptions;
            }
        }
    }
}

