const termsData = [
    {
        "key": "ES",
        "value": "Early Start"
    },
    {
        "key": "NH",
        "value": "National Holiday"
    },
    {
        "key": "RLOC",
        "value": "Return Left Over Concrete"
    },
    {
        "key": "SL",
        "value": "Short Load"
    },
    {
        "key": "SAD",
        "value": "Saturday Delivery"
    },
    {
        "key": "FH",
        "value": "Federal Holiday"
    },
    {
        "key": "UT",
        "value": "Unloading Time"
    },
    {
        "key": "EUT",
        "value": "Excess Unloading Time"
    },
    {
        "key": "WT",
        "value": "Waiting Time"
    },
    {
        "key": "SUD",
        "value": "Sunday Delivery"
    },
    {
        "key": "TL",
        "value": "Through Lunch"
    },
    {
        "key": "IIC",
        "value": "Interest Charges"
    },
    {
        "key": "SC",
        "value": "Surcharge"
    },
    {
        "key": "LP",
        "value": "Late Payment Charges",

    }
]

const termsDetailsData = [
    {
        "key": 1,
        "value": `PASS THRU INCREASES: Where the Seller(s) of any labor or material utilized by Seller(s) in
        connection with any of the concrete or other
        material sold to Buyer increases following the
        execution of this Agreement the price of the
        affected concrete or other material under this
        Agreement shall be adjusted by the amount of the
        Seller(s)’s increased cost and Buyer agrees to pay
        the price increase.
        There will be an environmental surcharge
        (subject to change) placed on all deliveries of
        $20.00/truck trip. Buyer shall pay bridge and
        tunnel crossing tolls to and from the jobsite as
        invoiced. Pursuant to DOT weight restrictions on
        MTA bridges there will be a surcharge of $37.50
        per yard delivered, if and when restrictions
        take effect. The Buyer agrees to pay a $100.00
        returned check fee for any payment by check
        returned by the Buyer’s bank for any reason.
`
    },
    {
        "key":2,
        "value": `MATERIALS:Seller shall provide all of the Goods set forth in
        the Contract for the Contract’s designated project.
        Buyer shall not utilize any other Seller to provide
        the Contracted goods for the Contract’s project
        unless agreed upon to in writing by both the Seller
        and Buyer. `
    },
    {
        "key":3,
        "value":`DELIVERY: All deliveries must be released
        prior to 8AM on date of pour. Cancellation fees are
        applicable once orders are released, fee to vary
        based on yardage cancelled and trucks allocated for
        scheduled delivery (rates can be found in
        corresponding “premium rates” on page 1 of quote).
        Provided order is placed by 12:00 PM on the day
        prior to delivery, and 48-hour notice if order is
        100 CY or more, Seller(s) agrees to cooperate with
        Buyer to have material ordered on job at time
        ordered and continue continuity of said material as
        requested during normal business hours, but DOES NOT
        GUARANTEE NOR ASSUME RESPONSBILITY for said time on
        job or continuity of material. Buyer agrees there
        will be NO DEDUCTIONS AND/OR BACKCHARGES for late
        deliveries or loss of continuity of material. In the
        event Buyer requests special service, Seller(s)
        will, when possible, supply this service providing
        said service and charge for service is agreed upon
        in advance. Seller shall not be liable for any
        failure or delay in performing obligation under this
        Agreement that is due to any of the following
        causes, to the extent beyond its reasonable control:
        acts of God; accident; riot; war; strike; terrorist
        act; epidemic; pandemic; quarantine; civil
        commotion; breakdown of communication facilities;
        breakdown of web host; breakdown of Internet service
        provider; natural catastrophes; governmental acts or
        omissions; changes in laws or regulations; national
        strikes; fire; explosion' generalized lack of
        availability of raw materials or energy.`
    },
    {
        "key": 4,
        "value": `SAFETY AND INDEMNIFICATION: It is the
        Buyer’s sole responsibility to maintain the safety
        of the jobsite. Buyer shall provide safe entrances,
        exits, jobsite conditions and activities, for
        Seller(s)’s trucks and/or personnel. And an
        environmentally safe area to wash down trucks, chute
        and/or disposal of excess concrete. Buyer shall be
        responsible and indemnify and hold harmless the
        Seller(s) and Seller(s)’s employees from any and all
        claims and liabilities, including but not limited to
        fines and violations, from any damage or loss to
        Seller(s)’s vehicles and/or personnel.`
    },
    {
        "key":5,
        "value": `WAITING TIME (WT) AND EXCESS UNLOADING TIME
        (EUT): Inclusive of mixing time and washing time will be
        computed on a daily basis, allowing 5 MINUTES per CY
        of concrete delivered. If at the end of billing
        period, total time exceeds allowable time, then a
        charge of $175.00 per ST hour ($2.92/min.) will be
        assessed (not including SAD/SUD/NH/FH).
            Standard hours of operation for weekday
            deliveries are loading times of 6:30 AM to 3:00
            PM. Any loads required outside of these times
            are subject to Plant opening ($312.50/hr) and/or
            overtime fees ($150.00/hr per truck). Additional
            loads required outside of Standard Hours of
            operation for weekdays are subject to Overtime
            Plant Opening & Truck Overtime Delivery Rates.
            Rates can be found under corresponding “premium
            rates” on page 1.`
    },
    {
        "key":6,
        "value": `RETURN OF LEFT-OVER CONCRETE (RLOC): Any
        RLOC for concrete ordered but not used and brought
        back to the plant cannot be returned for credit and
        will be subject to a charge of $75.00 per yard for
        disposal (subject to change without notice). `
    },
    {
        "key":7,
        "value": `
        SHORT LOADS (SL): One SL will be allowed with each day’s order of at
        least one full load. There will be a SL charge for
        any truck loaded under eight yards.
        `
    },
    {
        "key":8,
        "value": `
        TERMS: ALL PAYMENTS ARE DUE AND PAYABLE BY CREDIT TERMS
        STATED ON PAGE ONE OF THE CONTRACT AND/OR WHEN
        CREDIT LIMIT HAS BEEN REACHED. Invoices not paid
        within terms will be subject to a service charge of
        2% per month (compounded monthly) on the unpaid
        balance, plus all collection expenses included but
        not limited to legal costs, interest and
        disbursements. In the event these terms are not
        adhered to material supply may be terminated without
        notice. In the event payments are not received in
        accordance with this contract a lien may be placed
        on the project in default. If payment terms are not
        met the Seller(s) has the right to either stop
        deliveries or cancel contract at Seller(s)’s option.
        Upon this action all outstanding invoices will be
        due and payable immediately. This quotation is an
        offer which becomes a valid contract upon signing
        and/or acceptance of delivery of material ordered by
        Buyer and is not altered by any subsequent purchase
        order which may be issued by Buyer.
        `
    },
    {
        "key":9,
        "value":`ASSIGNMENT OF FUNDS: Buyer hereby assigns
        to Seller(s) payments due from the Seller(s) or
        Owner in the projects where the materials and used
        and Seller(s) is authorized to file this document as
        an Assignment of Funds in compliance with laws of
        the State of New York. `
    },
    {
        "key":10,
        "value": `PREMIUM DELIVERY (SAD/SUD/FH/NH/ES/OT/TL/SLD): will be by agreement only and will be assessed and
        billed accordingly.`
    },
    {
        "key":11,
        "value":`QUALITY: Seller(s) guarantees all concrete and aggregate as
        follows: (1) All materials used in the manufacture
        of our concrete shall be of approved sources and/or
        as agreed upon between the Buyer and the Seller(s);
        (2) Concrete shall be loaded at the State approved
        plants, within tolerances as specified in ACI-301
        and in accordance with testing laboratory approved
        mix designs; (3) Transportation to jobsite shall be
        within allowable time and mixed at jobsite to slump
        as specified by approved mix designs; (4) Buyer, at
        their option, may sample material at the discharge
        chute of the mixer truck and produce test cylinders
        to be cured and tested in accordance with ACI-301;
        (5) Seller(s) reserves the right to MONITOR,
        SUPERVISE and/or CONTROL all MIXING and TESTING and
        further reserves the right to REFUSE DELIVERY in the
        event material is not HANDLED in ACCORDANCE with
        ACI-301 and (6) Seller(s)’s responsibility and
        guarantee ends at the point of discharge and
        sampling at the mixer’s truck’s chute. After
        acceptance of material at said point, the Seller(s)
        DOES NOT GUARANTEE NOR ASSUME FURTHER RESPONBILITY
        and the Buyer agrees there will be NO DEDUCTIONS
        AND/OR BACKCHARGES and further agrees to pay for
        material accepted as billed within Seller(s)’s
        payment terms. `
    },
    {
        "key":12,
        "value":`CONDITIONS:Based on a revision of
        ACI-301-84, it is now required that the inspection
        agency shall “Report all test and inspection results
        to the concrete supplier immediately after work is
        performed. PRIOR TO ORDERING controlled materials,
        DIRECT THE TESTING LABORATORY to send us
        corresponding copies of every mix design and all
        test results for referenced project commensurate
        with Buyer’s copies of ALL TEST RESULTS.  `
    },
    {
        "key":13,
        "value":`SHIPPING PRIORITY: All orders for product from Buyers on open accounts
        shall be accepted by dispatcher, subject to approval
        by main office. Buyers who pay their bills timely
        and in accordance with our credit policy shall
        receive service commensurate with the manner in
        which they pay their bills.
            FIRST PRIORITY:
        Those Buyers whose accounts are paid in full and
        have a history of prompt payment or payment on
        delivery.
            SECOND PRIORITY:
        Those Buyers whose account balances do not exceed 30
        days after credit terms and have not exceeded their
        credit limit.
            THIRD PRIORITY:
        Those Buyers whose account balances do not exceed 60
        days and have not exceeded their credit limit.
            NO PRIORITY:
        Those Buyers having projects with any type of
        disputes whatsoever shall not receive service until
        such disputes are settled. In no event will orders
        be accepted from any Buyer whose account balance has
        exceeded 60 days after billing and whose credit
        limit has been reached unless management shall
        approve otherwise`
    },
    {
        "key":14,
        "value":`INVALIDITY: In the event that any of the
        terms and conditions itself herein is declared
        invalid, all of the remaining terms and conditions
        shall remain in full force and effect.`
    }
]

const termsTableData = {
    termsData,
    termsDetailsData
}
export { termsTableData }