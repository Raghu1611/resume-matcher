import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Link } from '@react-pdf/renderer';

const createStyles = (accentColor, template) => {
    const styles = StyleSheet.create({
        // CLASSIC - Traditional top-down
        classicPage: {
            padding: '25 35',
            fontFamily: 'Helvetica',
            fontSize: 10,
            color: '#000',
        },
        classicName: {
            fontSize: 24,
            fontWeight: 'bold',
            color: accentColor,
            marginBottom: 8,
            textTransform: 'uppercase',
        },
        classicContact: {
            fontSize: 9,
            marginBottom: 10,
            paddingBottom: 8,
            borderBottomWidth: 1.5,
            borderBottomColor: accentColor,
        },
        classicSection: {
            marginTop: 10,
        },
        classicSectionTitle: {
            fontSize: 12,
            fontWeight: 'bold',
            color: accentColor,
            textTransform: 'uppercase',
            marginBottom: 6,
            letterSpacing: 1,
        },

        // MODERN - Sidebar layout
        modernPage: {
            flexDirection: 'row',
            fontFamily: 'Helvetica',
            fontSize: 9.5,
            color: '#000',
        },
        modernSidebar: {
            width: '32%',
            backgroundColor: accentColor,
            padding: '20 15',
            color: '#fff',
        },
        modernMain: {
            width: '68%',
            padding: '20 20',
        },
        modernName: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: 8,
        },
        modernSidebarSection: {
            marginTop: 15,
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: 'rgba(255,255,255,0.3)',
        },
        modernSidebarTitle: {
            fontSize: 12,
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: 8,
            textTransform: 'uppercase',
        },

        // PROFESSIONAL - Compact horizontal header
        professionalPage: {
            padding: '25 35',
            fontFamily: 'Helvetica',
            fontSize: 10,
            color: '#000',
        },
        professionalHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 8,
            marginBottom: 12,
            borderBottomWidth: 2,
            borderBottomColor: accentColor,
        },
        professionalName: {
            fontSize: 26,
            fontWeight: 'bold',
            color: accentColor,
        },

        // EXECUTIVE - Bold accent blocks
        executivePage: {
            padding: '30 40',
            fontFamily: 'Helvetica',
            fontSize: 10,
            color: '#000',
        },
        executiveName: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#000',
            marginBottom: 5,
            letterSpacing: 2,
        },
        executiveTitle: {
            fontSize: 12,
            color: accentColor,
            marginBottom: 10,
            fontStyle: 'italic',
        },
        executiveSectionBar: {
            backgroundColor: accentColor,
            padding: '4 8',
            marginBottom: 8,
            marginTop: 12,
        },
        executiveSectionTitle: {
            fontSize: 13,
            fontWeight: 'bold',
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: 1.5,
        },

        // MINIMAL - Clean with accent underlines
        minimalPage: {
            padding: '30 40',
            fontFamily: 'Helvetica',
            fontSize: 10,
            color: '#000',
        },
        minimalName: {
            fontSize: 30,
            fontWeight: 'bold',
            color: '#000',
            marginBottom: 8,
        },
        minimalAccentLine: {
            height: 3,
            backgroundColor: accentColor,
            width: '50',
            marginBottom: 15,
        },
        minimalSection: {
            marginTop: 18,
        },
        minimalSectionTitle: {
            fontSize: 12,
            fontWeight: 'bold',
            color: accentColor,
            marginBottom: 12,
            paddingBottom: 4,
            borderBottomWidth: 2,
            borderBottomColor: accentColor,
        },

        // Common styles
        text: {
            fontSize: 9.5,
            lineHeight: 1.3,
            color: '#000',
            marginBottom: 2,
        },
        whiteText: {
            fontSize: 10,
            lineHeight: 1.4,
            color: '#fff',
            marginBottom: 3,
        },
        jobTitle: {
            fontSize: 10.5,
            fontWeight: 'bold',
            color: '#000',
            marginTop: 6,
        },
        jobTitleAccent: {
            fontSize: 10.5,
            fontWeight: 'bold',
            color: accentColor,
            marginTop: 6,
        },
        company: {
            fontSize: 10.5,
            fontStyle: 'italic',
            color: '#000',
            marginTop: 2,
        },
        date: {
            fontSize: 9.5,
            color: '#666',
            marginTop: 2,
        },
        whiteDate: {
            fontSize: 9.5,
            color: 'rgba(255,255,255,0.8)',
            marginTop: 2,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        profilePhoto: {
            width: 70,
            height: 70,
            borderRadius: 35,
            marginBottom: 10,
        },
        profilePhotoSquare: {
            width: 80,
            height: 80,
            marginBottom: 8,
        },
    });

    return styles;
};

const ResumeDocument = ({ data, template = 'Classic', accentColor = '#2563eb' }) => {
    const styles = createStyles(accentColor, template);

    // TEMPLATE 1: CLASSIC
    if (template === 'Classic') {
        return (
            <Document>
                <Page size="A4" style={styles.classicPage}>
                    {data.profilePhoto && <Image src={data.profilePhoto} style={styles.profilePhoto} />}
                    <Text style={styles.classicName}>{data.fullName || 'YOUR NAME'}</Text>
                    <View style={styles.classicContact}>
                        <Text style={styles.text}>
                            <Link src={`mailto:${data.email}`} style={{ color: '#000', textDecoration: 'none' }}>{data.email}</Link>
                            {' | '}{data.phone}{' | '}{data.location}
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: 2 }}>
                            {data.linkedin && (
                                <Link src={data.linkedin} style={{ ...styles.text, color: accentColor, marginRight: 10 }}>LinkedIn</Link>
                            )}
                            {data.github && (
                                <Link src={data.github} style={{ ...styles.text, color: accentColor }}>GitHub</Link>
                            )}
                        </View>
                    </View>

                    {data.summary && (
                        <View style={styles.classicSection}>
                            <Text style={styles.classicSectionTitle}>PROFESSIONAL SUMMARY</Text>
                            <Text style={styles.text}>{data.summary}</Text>
                        </View>
                    )}

                    {data.experience && data.experience.length > 0 && (
                        <View style={styles.classicSection}>
                            <Text style={styles.classicSectionTitle}>EXPERIENCE</Text>
                            {data.experience.map((exp, i) => (
                                <View key={i} style={{ marginBottom: 12 }}>
                                    <Text style={styles.jobTitleAccent}>{exp.title}</Text>
                                    <Text style={styles.company}>{exp.company}</Text>
                                    <Text style={styles.date}>{exp.startDate} - {exp.endDate}</Text>
                                    <Text style={styles.text}>{exp.description}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {data.education && data.education.length > 0 && (
                        <View style={styles.classicSection}>
                            <Text style={styles.classicSectionTitle}>EDUCATION</Text>
                            {data.education.map((edu, i) => (
                                <View key={i} style={{ marginBottom: 8 }}>
                                    <Text style={styles.jobTitle}>{edu.degree}</Text>
                                    <Text style={styles.company}>{edu.school}</Text>
                                    <Text style={styles.date}>{edu.year}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {data.skills && (
                        <View style={styles.classicSection}>
                            <Text style={styles.classicSectionTitle}>SKILLS</Text>
                            <Text style={styles.text}>{data.skills}</Text>
                        </View>
                    )}

                    {data.certifications && (
                        <View style={styles.classicSection}>
                            <Text style={styles.classicSectionTitle}>CERTIFICATIONS</Text>
                            <Text style={styles.text}>{data.certifications}</Text>
                        </View>
                    )}
                </Page>
            </Document>
        );
    }

    // TEMPLATE 2: MODERN SIDEBAR
    if (template === 'Modern') {
        return (
            <Document>
                <Page size="A4" style={styles.modernPage}>
                    <View style={styles.modernSidebar}>
                        {data.profilePhoto && <Image src={data.profilePhoto} style={styles.profilePhotoSquare} />}
                        <Text style={styles.modernName}>{data.fullName || 'YOUR NAME'}</Text>

                        <View style={styles.modernSidebarSection}>
                            <Text style={styles.modernSidebarTitle}>CONTACT</Text>
                            <Link src={`mailto:${data.email}`} style={{ ...styles.whiteText, textDecoration: 'none' }}>{data.email}</Link>
                            <Text style={styles.whiteText}>{data.phone}</Text>
                            <Text style={styles.whiteText}>{data.location}</Text>
                            {data.linkedin && (
                                <Link src={data.linkedin} style={{ ...styles.whiteText, textDecoration: 'underline' }}>LinkedIn</Link>
                            )}
                            {data.github && (
                                <Link src={data.github} style={{ ...styles.whiteText, textDecoration: 'underline' }}>GitHub</Link>
                            )}
                        </View>
                        {data.skills && (
                            <View style={styles.modernSidebarSection}>
                                <Text style={styles.modernSidebarTitle}>SKILLS</Text>
                                <Text style={styles.whiteText}>{data.skills}</Text>
                            </View>
                        )}

                        {data.languages && (
                            <View style={styles.modernSidebarSection}>
                                <Text style={styles.modernSidebarTitle}>LANGUAGES</Text>
                                <Text style={styles.whiteText}>{data.languages}</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.modernMain}>
                        {data.summary && (
                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ ...styles.classicSectionTitle, color: accentColor }}>PROFILE</Text>
                                <Text style={styles.text}>{data.summary}</Text>
                            </View>
                        )}

                        {data.experience && data.experience.length > 0 && (
                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ ...styles.classicSectionTitle, color: accentColor }}>EXPERIENCE</Text>
                                {data.experience.map((exp, i) => (
                                    <View key={i} style={{ marginBottom: 12 }}>
                                        <Text style={styles.jobTitle}>{exp.title}</Text>
                                        <Text style={styles.company}>{exp.company}</Text>
                                        <Text style={styles.date}>{exp.startDate} - {exp.endDate}</Text>
                                        <Text style={styles.text}>{exp.description}</Text>
                                    </View>
                                ))}
                            </View>
                        )}

                        {data.education && data.education.length > 0 && (
                            <View>
                                <Text style={{ ...styles.classicSectionTitle, color: accentColor }}>EDUCATION</Text>
                                {data.education.map((edu, i) => (
                                    <View key={i} style={{ marginBottom: 8 }}>
                                        <Text style={styles.jobTitle}>{edu.degree}</Text>
                                        <Text style={styles.company}>{edu.school}</Text>
                                        <Text style={styles.date}>{edu.year}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                </Page>
            </Document >
        );
    }

    // TEMPLATE 3: PROFESSIONAL
    if (template === 'Professional') {
        return (
            <Document>
                <Page size="A4" style={styles.professionalPage}>
                    <View style={styles.professionalHeader}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.professionalName}>{data.fullName || 'YOUR NAME'}</Text>
                            <Text style={{ ...styles.text, color: accentColor, fontSize: 11 }}>{data.professionalTitle || 'Professional Title'}</Text>
                        </View>
                        <View style={{ textAlign: 'right' }}>
                            <Link src={`mailto:${data.email}`} style={{ ...styles.text, textDecoration: 'none' }}>{data.email}</Link>
                            <Text style={styles.text}>{data.phone}</Text>
                            <Text style={styles.text}>{data.location}</Text>
                            {data.linkedin && (
                                <Link src={data.linkedin} style={{ ...styles.text, color: accentColor }}>LinkedIn</Link>
                            )}
                            {data.github && (
                                <Link src={data.github} style={{ ...styles.text, color: accentColor }}>GitHub</Link>
                            )}
                        </View>
                    </View>

                    {data.summary && (
                        <View style={{ marginBottom: 15 }}>
                            <Text style={styles.text}>{data.summary}</Text>
                        </View>
                    )}

                    {data.experience && data.experience.length > 0 && (
                        <View style={{ marginBottom: 15 }}>
                            <Text style={{ ...styles.classicSectionTitle, color: accentColor, fontSize: 13 }}>EXPERIENCE</Text>
                            {data.experience.map((exp, i) => (
                                <View key={i} style={{ marginBottom: 10 }}>
                                    <View style={styles.row}>
                                        <Text style={styles.jobTitle}>{exp.title} | {exp.company}</Text>
                                        <Text style={styles.date}>{exp.startDate} - {exp.endDate}</Text>
                                    </View>
                                    <Text style={styles.text}>{exp.description}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {data.education && data.education.length > 0 && (
                        <View style={{ marginBottom: 15 }}>
                            <Text style={{ ...styles.classicSectionTitle, color: accentColor, fontSize: 13 }}>EDUCATION</Text>
                            {data.education.map((edu, i) => (
                                <View key={i} style={styles.row}>
                                    <Text style={styles.text}>{edu.degree} - {edu.school}</Text>
                                    <Text style={styles.date}>{edu.year}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {data.skills && (
                        <View>
                            <Text style={{ ...styles.classicSectionTitle, color: accentColor, fontSize: 13 }}>CORE COMPETENCIES</Text>
                            <Text style={styles.text}>{data.skills}</Text>
                        </View>
                    )}

                    {data.certifications && (
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ ...styles.classicSectionTitle, color: accentColor, fontSize: 13 }}>CERTIFICATIONS</Text>
                            <Text style={styles.text}>{data.certifications}</Text>
                        </View>
                    )}

                    {data.languages && (
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ ...styles.classicSectionTitle, color: accentColor, fontSize: 13 }}>LANGUAGES</Text>
                            <Text style={styles.text}>{data.languages}</Text>
                        </View>
                    )}
                </Page>
            </Document>
        );
    }

    // TEMPLATE 4: EXECUTIVE
    if (template === 'Executive') {
        return (
            <Document>
                <Page size="A4" style={styles.executivePage}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.executiveName}>{data.fullName || 'YOUR NAME'}</Text>
                            <Text style={styles.executiveTitle}>{data.professionalTitle || 'Executive Professional'}</Text>
                        </View>
                    </View>
                    <Text style={styles.text}>
                        <Link src={`mailto:${data.email}`} style={{ color: '#000', textDecoration: 'none' }}>{data.email}</Link>
                        {' • '}{data.phone}{' • '}{data.location}
                        {data.linkedin && (
                            <> • <Link src={data.linkedin} style={{ color: accentColor }}>LinkedIn</Link></>
                        )}
                        {data.github && (
                            <> • <Link src={data.github} style={{ color: accentColor }}>GitHub</Link></>
                        )}
                    </Text>

                    {data.summary && (
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.text}>{data.summary}</Text>
                        </View>
                    )}

                    {data.experience && data.experience.length > 0 && (
                        <View>
                            <View style={styles.executiveSectionBar}>
                                <Text style={styles.executiveSectionTitle}>PROFESSIONAL EXPERIENCE</Text>
                            </View>
                            {data.experience.map((exp, i) => (
                                <View key={i} style={{ marginBottom: 14 }}>
                                    <Text style={{ ...styles.jobTitle, fontSize: 12, color: accentColor }}>{exp.title}</Text>
                                    <Text style={styles.company}>{exp.company} | {exp.startDate} - {exp.endDate}</Text>
                                    <Text style={styles.text}>{exp.description}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {data.education && data.education.length > 0 && (
                        <View>
                            <View style={styles.executiveSectionBar}>
                                <Text style={styles.executiveSectionTitle}>EDUCATION</Text>
                            </View>
                            {data.education.map((edu, i) => (
                                <Text key={i} style={styles.text}>{edu.degree}, {edu.school} ({edu.year})</Text>
                            ))}
                        </View>
                    )}

                    {data.skills && (
                        <View>
                            <View style={styles.executiveSectionBar}>
                                <Text style={styles.executiveSectionTitle}>KEY COMPETENCIES</Text>
                            </View>
                            <Text style={styles.text}>{data.skills}</Text>
                        </View>
                    )}

                    {data.certifications && (
                        <View>
                            <View style={styles.executiveSectionBar}>
                                <Text style={styles.executiveSectionTitle}>CERTIFICATIONS</Text>
                            </View>
                            <Text style={styles.text}>{data.certifications}</Text>
                        </View>
                    )}

                    {data.languages && (
                        <View>
                            <View style={styles.executiveSectionBar}>
                                <Text style={styles.executiveSectionTitle}>LANGUAGES</Text>
                            </View>
                            <Text style={styles.text}>{data.languages}</Text>
                        </View>
                    )}

                </Page>
            </Document >
        );
    }


    // TEMPLATE 6: ATS BLACK & WHITE (No colors, maximum compatibility)
    if (template === 'ATS') {
        return (
            <Document>
                <Page size="A4" style={{ ...styles.classicPage, fontSize: 11 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000', marginBottom: 6, textTransform: 'uppercase' }}>{data.fullName || 'YOUR NAME'}</Text>
                    {data.professionalTitle && <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#000', marginBottom: 10 }}>{data.professionalTitle}</Text>}
                    <View style={{ fontSize: 10, marginBottom: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#000' }}>
                        <Text style={styles.text}>
                            <Link src={`mailto:${data.email}`} style={{ color: '#000', textDecoration: 'none' }}>{data.email}</Link>
                            {' | '}{data.phone}{' | '}{data.location}
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: 2 }}>
                            {data.linkedin && (
                                <Link src={data.linkedin} style={{ ...styles.text, color: '#000', marginRight: 10, textDecoration: 'underline' }}>LinkedIn</Link>
                            )}
                            {data.github && (
                                <Link src={data.github} style={{ ...styles.text, color: '#000', textDecoration: 'underline' }}>GitHub</Link>
                            )}
                        </View>
                    </View>

                    {data.summary && (
                        <View style={{ marginTop: 12, marginBottom: 14 }}>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#000', textTransform: 'uppercase', marginBottom: 8, paddingBottom: 2, borderBottomWidth: 1, borderBottomColor: '#000' }}>PROFESSIONAL SUMMARY</Text>
                            <Text style={styles.text}>{data.summary}</Text>
                        </View>
                    )}

                    {data.experience && data.experience.length > 0 && (
                        <View style={{ marginBottom: 14 }}>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#000', textTransform: 'uppercase', marginBottom: 8, paddingBottom: 2, borderBottomWidth: 1, borderBottomColor: '#000' }}>EXPERIENCE</Text>
                            {data.experience.map((exp, i) => (
                                <View key={i} style={{ marginBottom: 10 }}>
                                    <Text style={{ fontSize: 11.5, fontWeight: 'bold', color: '#000' }}>{exp.title}</Text>
                                    <Text style={{ fontSize: 10.5, fontStyle: 'italic', color: '#000' }}>{exp.company}</Text>
                                    <Text style={{ fontSize: 9.5, color: '#666', marginTop: 2 }}>{exp.startDate} - {exp.endDate}</Text>
                                    <Text style={styles.text}>{exp.description}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {data.education && data.education.length > 0 && (
                        <View style={{ marginBottom: 14 }}>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#000', textTransform: 'uppercase', marginBottom: 8, paddingBottom: 2, borderBottomWidth: 1, borderBottomColor: '#000' }}>EDUCATION</Text>
                            {data.education.map((edu, i) => (
                                <View key={i} style={{ marginBottom: 6 }}>
                                    <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#000' }}>{edu.degree}</Text>
                                    <Text style={{ fontSize: 10.5, fontStyle: 'italic', color: '#000' }}>{edu.school}</Text>
                                    <Text style={{ fontSize: 9.5, color: '#666' }}>{edu.year}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {data.skills && (
                        <View style={{ marginBottom: 14 }}>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#000', textTransform: 'uppercase', marginBottom: 8, paddingBottom: 2, borderBottomWidth: 1, borderBottomColor: '#000' }}>SKILLS</Text>
                            <Text style={styles.text}>{data.skills}</Text>
                        </View>
                    )}

                    {data.certifications && (
                        <View style={{ marginBottom: 14 }}>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#000', textTransform: 'uppercase', marginBottom: 8, paddingBottom: 2, borderBottomWidth: 1, borderBottomColor: '#000' }}>CERTIFICATIONS</Text>
                            <Text style={styles.text}>{data.certifications}</Text>
                        </View>
                    )}

                    {data.languages && (
                        <View>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#000', textTransform: 'uppercase', marginBottom: 8, paddingBottom: 2, borderBottomWidth: 1, borderBottomColor: '#000' }}>LANGUAGES</Text>
                            <Text style={styles.text}>{data.languages}</Text>
                        </View>
                    )}
                </Page>
            </Document>
        );
    }

    // TEMPLATE 5: MINIMAL
    return (
        <Document>
            <Page size="A4" style={styles.minimalPage}>
                <Text style={styles.minimalName}>{data.fullName || 'YOUR NAME'}</Text>
                <View style={styles.minimalAccentLine} />
                <Text style={styles.text}>
                    <Link src={`mailto:${data.email}`} style={{ color: '#000', textDecoration: 'none' }}>{data.email}</Link>
                    {' | '}{data.phone}{' | '}{data.location}
                    {data.linkedin && (
                        <> | <Link src={data.linkedin} style={{ color: accentColor }}>LinkedIn</Link></>
                    )}
                    {data.github && (
                        <> | <Link src={data.github} style={{ color: accentColor }}>GitHub</Link></>
                    )}
                </Text>

                {data.summary && (
                    <View style={styles.minimalSection}>
                        <Text style={styles.minimalSectionTitle}>About</Text>
                        <Text style={styles.text}>{data.summary}</Text>
                    </View>
                )}

                {data.experience && data.experience.length > 0 && (
                    <View style={styles.minimalSection}>
                        <Text style={styles.minimalSectionTitle}>Experience</Text>
                        {data.experience.map((exp, i) => (
                            <View key={i} style={{ marginBottom: 16 }}>
                                <Text style={styles.jobTitle}>{exp.title}</Text>
                                <Text style={{ ...styles.company, color: accentColor }}>{exp.company}</Text>
                                <Text style={styles.date}>{exp.startDate} - {exp.endDate}</Text>
                                <Text style={styles.text}>{exp.description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {data.education && data.education.length > 0 && (
                    <View style={styles.minimalSection}>
                        <Text style={styles.minimalSectionTitle}>Education</Text>
                        {data.education.map((edu, i) => (
                            <View key={i} style={{ marginBottom: 10 }}>
                                <Text style={styles.jobTitle}>{edu.degree}</Text>
                                <Text style={styles.company}>{edu.school} • {edu.year}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {data.skills && (
                    <View style={styles.minimalSection}>
                        <Text style={styles.minimalSectionTitle}>Skills</Text>
                        <Text style={styles.text}>{data.skills}</Text>
                    </View>
                )}
            </Page>
        </Document>
    );
};

export default ResumeDocument;
