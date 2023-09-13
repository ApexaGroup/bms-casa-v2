// express imports
const express = require("express");

// cors imports
const cors = require("cors");

// routes imports
const authRoutes = require("./src/routes/authRoutes");
// const roleRoutes = require("./src/routes/roleRoutes")
const userRoutes = require("./src/routes/userRoutes");
const construction_companyRoutes = require("./src/routes/constructionCompanyRoutes");
const projectManagerRoutes = require("./src/routes/projectManagerRoutes");
const overtimeFeesRoutes = require("./src/routes/overtimeFeesRoutes");
const premiumRatesRoutes = require("./src/routes/premiumRatesRoutes");
const shortLoadRoutes = require("./src/routes/shortLoadRoutes");
const extraChargeRoutes = require("./src/routes/extraChargeRoutes");
const mixDesignRoutes = require("./src/routes/mixDesignRoutes");
const addressRoutes = require("./src/routes/addressRoutes");
const leadInformationRoutes = require("./src/routes/leadInformationRoutes");
const followupRoutes = require("./src/routes/followUpRoutes");
const auditLogsRoutes = require("./src/routes/auditLogsRoutes");
const plantInformationRoutes = require("./src/routes/plantInformationRoutes");
const opportunityRoutes = require("./src/routes/opportunityRoutes");
const qualityControlRoutes = require("./src/routes/qualityControlRoutes");
const sendMailRoutes = require("./src/routes/mailRoutes");
const quotationRoutes = require("./src/routes/quotationRoutes");
const quoteExtraChargeRoutes = require("./src/routes/quoteExtraChargeRoutes")
const quoteOvertimeFeesRoutes = require("./src/routes/quoteOvertimeFeesRoutes")
const quotePremiumRatesRoutes = require("./src/routes/quotePremiumRatesRoutes")
const quoteShortLoadRoutes = require("./src/routes/quoteShortLoadRoutes")
const termsConditionShortRoutes = require("./src/routes/termsConditionShortRoutes")
const termsConditionFullRoutes = require("./src/routes/termsConditionFullRoutes")
const approvalTransRoutes = require("./src/routes/approverMasterRoutes")
// dotenve imports
require("dotenv").config();

// express app instance
const app = express();

// cors
app.use(cors());

// serving static files
app.use(express.static("./"));

// using json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes to be used
app.use("/auth", authRoutes);
// app.use("/admin", roleRoutes);
app.use("/user", userRoutes);
app.use("/construction-company", construction_companyRoutes);
app.use("/project-manager", projectManagerRoutes);
app.use("/over-time-fees", overtimeFeesRoutes);
app.use("/premium-rates", premiumRatesRoutes);
app.use("/short-load-charges", shortLoadRoutes);
app.use("/extra-charges", extraChargeRoutes);
app.use("/mix-design", mixDesignRoutes);
app.use("/lead-section", addressRoutes);
app.use("/lead-information", leadInformationRoutes);
app.use("/follow-up-section", followupRoutes);
app.use("/audit-logs", auditLogsRoutes);
app.use("/plant-information", plantInformationRoutes);
app.use("/opportunity", opportunityRoutes);
app.use("/quality-control", qualityControlRoutes);
app.use("/mail", sendMailRoutes);
app.use("/quotation", quotationRoutes);
app.use("/quoteExtraCharge", quoteExtraChargeRoutes)
app.use("/quoteOvertimeFees", quoteOvertimeFeesRoutes)
app.use("/quotePremiumRates", quotePremiumRatesRoutes)
app.use("/quoteShortLoad", quoteShortLoadRoutes)
app.use("/termsConditionShortDetail", termsConditionShortRoutes)
app.use("/termsConditionFullDetail", termsConditionFullRoutes)
app.use("/approvalTrans", approvalTransRoutes)
// port defination
const PORT = process.env.PORT || 8080;

// app listening
exports.servers = app.listen(PORT, () =>
  console.log(`🚀 @ http://localhost:${PORT}`)
);
