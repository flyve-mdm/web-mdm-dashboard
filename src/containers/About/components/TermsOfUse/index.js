import React from 'react'
import { I18n, Translate } from 'react-i18nify'
import Title from '../../../../components/Title'

const TermsOfUse = () => (
  <div>
    <Title text="Terms Of Use"/>
    <div className="aboutPane">
      <Translate value={'about.term_of_use_STRINGS.by_using_our_website,_you_agree_to_be_bound_by_the_full_terms_&_conditions_posted_on_our_website'} tag='p'/>
      <Translate value={'about.term_of_use_STRINGS.these_terms_and_conditions_apply_to_the_business_relation_between_the_client_and_the_editor_(as_identified_further_below),_arising_from_the_client_requesting_the_editor_to_provide_certain_corporate_and_management_services_any_order_placed_in_any_of_our_offices,_by_internet_or_by_any_other_means,_shall_constitute_a_binding_agreement_of_these_terms_&_conditions_between_the_client_and_the_editor'} tag='p'/>
      <p>
        <strong>
            I. { I18n.t('about.term_of_use_STRINGS.definitions') }
        </strong>
      </p> 
      <p>
        <strong>
            &#8220;{ I18n.t('about.term_of_use_STRINGS.the_editor') }&#8221;
        </strong> 
        &nbsp;{ I18n.t('about.term_of_use_STRINGS.means_teclib’_spain,_a_company,_registered_in_spain_and_it_also_includes_any_subsidiary_or_branch_of_teclib’_group,_which_provides_services_to_the_client_or_the_company')}
      </p>
      <p>
        <strong>
            &#8220;{ I18n.t('about.term_of_use_STRINGS.services') }&#8221;
        </strong>
        &nbsp;{ I18n.t('about.term_of_use_STRINGS.means_any_or_several_of_the_following:_glpi_network,_kimios_dms,_uhuru_mobile,_armadito_antivirus,_flyve_mdm,_training_sessions,_any_it_related_services_and_support,_partnership_agreements,_registered_member_agreements,_marketing_agreements,_administrative_and_managerial_work_and_any_other_corporate_services_of_similar_nature_that_the_editor_agrees_to_provide')}
      </p>
      <p>
        <strong>
            &#8220;{ I18n.t('about.term_of_use_STRINGS.company') }&#8221;
        </strong>
        &nbsp;{I18n.t('about.term_of_use_STRINGS.means_any_company_beneficially_owned_by_the_client_for_which_services_are_provided_by_the_editor') }
      </p>
      <p>
        <strong>
            &#8220; { I18n.t('about.term_of_use_STRINGS.client') } &#8221;
        </strong> 
        &nbsp;{I18n.t('about.term_of_use_STRINGS.means_the_beneficial_owner(s)_of_the_company_and/or_the_person(s)_who_has(ve)_requested_the_editor_to_provide_services__it_also_means_any_person_the_client_may_represent_in_the_case_of_a_group_(all_such_persons_jointly_and_separately)') }
      </p>
      <p>
        <strong>
            &#8220; { I18n.t('about.term_of_use_STRINGS.contact_form') }&#8221; 
        </strong>
        &nbsp;{I18n.t('about.term_of_use_STRINGS.means_the_standard_contact_form_posted_on_the_editor’s_website_or_other_format_of_the_same_form_submitted_by_the_client_to_the_editor_before_beginning_and_providing_services') }
      </p>
      <p>
        <strong>
            &#8220; { I18n.t('about.term_of_use_STRINGS.communication') }&#8221; 
        </strong>
        &nbsp;{I18n.t('about.term_of_use_STRINGS.means_any_communication_between_the_editor_and_the_client_by_any_of_the_following_methods:_(a)_email_or_other_message_or_form_posted_through_the_internet;_(b)_fax;_(c)_courier_or_mail_delivery,_any_of_the_above_being_addressed_to_the_last_known_or_notified_address_of_the_recipient') }
      </p>
      <p>
        <u><strong>II. { I18n.t('about.term_of_use_STRINGS.general_notes') }</strong></u>
      </p>
      <p>
        <strong>{ I18n.t('about.term_of_use_STRINGS.complaints_procedure') }</strong><br />
        { I18n.t('about.term_of_use_STRINGS.complaints_procedure_STRINGS.the_management_of_the_company_wishes_to_remain_open_to_well-founded_complaints_in_order_not_to_only_resolve_them_efficiently,_but_also_to_improve_our_service_at_large_complaints_are_usually_handled_by_the_office_manager,_however_if_you_have_a_complaint_that_cannot_be_resolved,_you_can_write_an_email_to_our_complaint_resolution_department') } <br />
        { I18n.t('about.term_of_use_STRINGS.complaints_procedure_STRINGS.complaints_can_be_lodged_in_writing_to_the_office_with_the_envelope_marked_personal_and_confidential') } <br />
        { I18n.t('about.term_of_use_STRINGS.complaints_procedure_STRINGS.please_substantiate_any_complaints_with_precise_facts,_dates_and_names_if_you_want_us_to_be_able_to_act_on_your_complaint_any_vague_complaints_or_unconstructive_insults_will_be_discarded_without_follow-up_we_will_attempt_to_answer_or_resolve_any_complaint_within_a_maximum_of_3_days') }
      </p>
      <p>
        <u><strong>III. { I18n.t('about.term_of_use_STRINGS.our_services') }</strong></u>
      </p>
      <p><strong>GLPi Network</strong><br />
        { I18n.t('about.term_of_use_STRINGS.our_services_STRINGS.distribution_of_a_complete_pack_based_on_glpi_project_and_other_open_source_technologies,_that_helps_you_manage_and_control_your_it_infrastructure,_with_asset_management,_ticketing_and_loads_of_features_and_plugins') }
      </p>
      <p><strong>Kimios DMS</strong><br />
        { I18n.t('about.term_of_use_STRINGS.our_services_STRINGS.java-based,_open_source_knowledge_management_solution_also_document_management_system_it_helps_you_produce,_store,_organize,_manage_and_research_any_kind_of_document,_media_and_file_in_your_repository') }
      </p>
      <p><strong>Uhuru Mobile</strong><br />
        { I18n.t('about.term_of_use_STRINGS.our_services_STRINGS.secure_operating_system_for_android-based_smartphones,_tablets,_pcs_and_applications') } <br />
        { I18n.t('about.term_of_use_STRINGS.our_services_STRINGS.uhuru_analyzes,_controls_and_protects_against_malware_and_vulnerability_exploits') }
      </p>
      <p><strong>Armadito Antivirus</strong><br />
        { I18n.t('about.term_of_use_STRINGS.our_services_STRINGS.open_source_antivirus_and_anti-malware_software_for_desktop_(computers)_and_servers_it_analyses_your_system,_detects_viruses,_identify_malware_codes,_and_last_but_not_least:_it_protects_and_strengthens_your_network') }
      </p>
      <p><strong>Flyve MDM</strong><br />
        { I18n.t('about.term_of_use_STRINGS.our_services_STRINGS.mobile_device_management_that_allows_you_to:_configure,_deploy,_secure,_monitor,_integrate_and_manage_any_mobile_devices_within_the_organization,_protecting_your_corporate_network_and_data') }
      </p>
      <p><strong>Teclib&#8217; { I18n.t('about.term_of_use_STRINGS.our_services_STRINGS.training_courses')}</strong><br />
        { I18n.t('about.term_of_use_STRINGS.our_services_STRINGS.follow_a_training_program,_get_certified_and_become_an_expert_of_our_technologies')}
      </p>
      <p><strong>{ I18n.t('about.term_of_use_STRINGS.our_services_STRINGS.become_a_partner')}</strong><br />
        { I18n.t('about.term_of_use_STRINGS.our_services_STRINGS.our_partnership_program_gives_access_to_a_portfolio_of_subscription-based_services,_letting_partners_and_customers_receive_technical_support_and_trainings,_to_answer_the_fast_evolving_business’_needs')}
      </p>
      <p><strong>{ I18n.t('about.term_of_use_STRINGS.our_services_STRINGS.become_a_registered_member')}</strong><br />
        { I18n.t('about.term_of_use_STRINGS.our_services_STRINGS.becoming_a_teclib’_registered_member_is_a_great_way_to_help_improve_your_profit_potential_and_ensure_your_business_is_recognized_by_the_industry_and_amongst_end-users_as_being_professional_and_technically_competent')}
      </p>
      <p><u><strong>IIII. { I18n.t('about.term_of_use_STRINGS.general_conditions') }</strong></u></p>
      <p><strong>{ I18n.t('about.term_of_use_STRINGS.general_conditions_STRINGS.your_obligations_under_this_agreement') }</strong><br />
        { I18n.t('about.term_of_use_STRINGS.general_conditions_STRINGS.we_provide_you_services_with_the_understanding_that_you_have_supplied_us_with_true_and_accurate_instructions_and_that_you_have_given_us_the_authority_to_lawfully_carry_out_those_instructions_you_warrant_that_you_are_acting_on_your_own_authority_or_have_the_authority_of_your_client_to_instruct_us_in_this_regards') }<br />
        { I18n.t('about.term_of_use_STRINGS.general_conditions_STRINGS.while_identifying_officers_to_the_company,_you_fully_warrant_that_you_have_the_legal_consent_of_those_officers,_and_you_agree_to_indemnify_us_in_the_case_of_a_conflict_with_the_directors_you_will_ensure_the_accuracy_and_completeness_of_the_information_you_provide_us') }
      </p>
      <p><strong>{ I18n.t('about.term_of_use_STRINGS.general_conditions_STRINGS.our_obligations_under_this_agreement') }</strong><br />
        { I18n.t('about.term_of_use_STRINGS.general_conditions_STRINGS.we_will_take_reasonable_steps_to_insure_that_our_website_is_as_complete_and_precise_as_possible_and_to_protect_your_privacy_we_will_protect_your_private_data_and_will_never_stock_any_information_without_strong_encryption_and_following_pci-dss_guidelines') }
      </p>
      <p><strong>{ I18n.t('about.term_of_use_STRINGS.general_conditions_STRINGS.force_majeure') }</strong><br />
        { I18n.t('about.term_of_use_STRINGS.general_conditions_STRINGS.we_shall_in_no_case_be_liable_to_you_for_any_breach_of_the_terms_and_conditions_or_any_failure_to_provide_or_delay_in_providing_our_services_through_our_site_resulting_from_any_event_or_circumstance_beyond_our_reasonable_control_including,_without_limitation,_breakdown_of_systems_or_network_access,_fire,_explosion_or_accident_or_any_“acts_of_god”') }
      </p>
      <p><strong>{ I18n.t('about.term_of_use_STRINGS.general_conditions_STRINGS.exclusions_and_limitations') }</strong><br />
        { I18n.t('about.term_of_use_STRINGS.general_conditions_STRINGS.we_make_no_representations_or_warranties_about_the_accuracy,_completeness,_or_suitability_for_any_specific_purpose_of_the_information_and_related_graphics_published_on_our_website') } <br />
        { I18n.t('about.term_of_use_STRINGS.general_conditions_STRINGS.the_information_published_may_contain_technical_inaccuracies,_out-dated_material_or_typographical_errors_and_is_only_intended_to_be_a_general_indication_of_our_services_except_for_claims_related_to_death_or_personal_injury_resulting_from_negligence_or_as_otherwise_prescribed_by_law,_our_liability_for_any_loss_or_damage_(compensatory,_direct,_indirect_or_consequential_damages,_loss_of_data,_income_or_profit,_loss_or_damage_to_property_and_claims_of_third_parties)_arising_out_of_any_single_claim_will_be_limited_to_the_value_of_re-supplying_the_relevant_product_or_service') }
      </p>
      <p>
        { I18n.t('about.term_of_use_STRINGS.general_conditions_STRINGS.you_agree_that_this_limitation_is_reasonable_due_to_the_nature_of_our_site_and_given_that_when_you_require_information_or_services_through_our_site_you_start_a_separate_contract_with_us_in_each_case') }
      </p>
      <p><strong>{ I18n.t('about.term_of_use_STRINGS.general_conditions_STRINGS.changes_in_content_and_services') }</strong><br />
        { I18n.t('about.term_of_use_STRINGS.general_conditions_STRINGS.at_any_time_and_without_notice,_we_reserve_the_right_to_revise_our_terms_and_conditions,_our_bouquet_of_services_and_the_content_of_our_site') }
      </p>
      <p>{ I18n.t('about.term_of_use_STRINGS.general_conditions_STRINGS.outgoing_web_links') }<br />
        { I18n.t('about.term_of_use_STRINGS.general_conditions_STRINGS.outgoing_links_to_third_party_websites_are_provided_for_your_convenience_and_for_general_information_we_do_not_warrant_any_of_the_content,_services_or_accuracy_of_these_third_parties') }
      </p>
      <p><strong>{ I18n.t('about.term_of_use_STRINGS.general_conditions_STRINGS.ownership_and_rights_to_the_materials_on_this_website') }</strong><br />
        { I18n.t('about.term_of_use_STRINGS.general_conditions_STRINGS.all_rights_to_the_design,_text_&_graphics_and_any_other_material_on_our_website,_layout_and_style_are_our_own_copyright_or_the_ones_of_related_third_parties_permission_is_granted_to_electronically_copy_and_print_hard_copy_portions_of_our_site_solely_for_the_purpose_of_studying_offers_in_connection_with_the_acquisition_of_goods_or_services_from_our_website_any_other_use_of_the_materials_on_our_website_(including_reproduction_for_purposes_other_than_those_above_mentioned_and_any_alteration,_modification,_distribution,_or_publication)_without_our_prior_written_permission_is_strictly_prohibited_and_will_be_prosecuted_to_the_full_extend_authorized_by_law') }
      </p>
      <p><strong>{ I18n.t('about.term_of_use_STRINGS.general_conditions_STRINGS.third_party_rights') }</strong><br />
        { I18n.t('about.term_of_use_STRINGS.general_conditions_STRINGS.our_terms_and_conditions_are_not_intended_to_be_enforceable_by_any_third_party') }
      </p>
      <p><strong>{ I18n.t('about.term_of_use_STRINGS.general_conditions_STRINGS.competent_jurisdiction_and_tribunals') }</strong><br />
        { I18n.t('about.term_of_use_STRINGS.general_conditions_STRINGS.these_terms_and_conditions_and_our_relationship_with_you_shall_be_governed_by_and_construed_in_accordance_with_the_laws_of_spain_and_will_be_subject_to_the_exclusive_jurisdiction_of_the_spanish_courts') }
      </p>
      <p><strong>{ I18n.t('about.term_of_use_STRINGS.general_conditions_STRINGS.privacy_policy') }</strong><br />
        { I18n.t('about.term_of_use_STRINGS.general_conditions_STRINGS.you_agree_that_we_may_collect,_store,_and_use_information_about_you_in_accordance_with_our_privacy_policy_you_acknowledge_and_agree_to_be_bound_by_the_terms_of_our_privacy_policy') }
      </p>
    </div>
  </div>
)
    
export default TermsOfUse