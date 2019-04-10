import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

// Model
import { Proposal } from '../../../models/proposal';

// Services
import { FunctionsServices } from '../../../services/functions.service';
import { ProposalService } from '../../../services/proposal.service';

// Icons
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

declare var $: any;

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.scss'],
  providers: [FunctionsServices, ProposalService]
})
export class ProposalsComponent implements OnInit {

  public title: String;
  public roleEmployee: String;
  public proposals: Proposal;
  public proposal: Proposal;
  public delProposal: Proposal;


  // Icons
  public faThumbsUp = faThumbsUp;
  public faThumbsDown = faThumbsDown;
  public faCheck = faCheck;
  public faTimes = faTimes;
  public faTrashAlt = faTrashAlt;

  constructor(
    private _functionsServices: FunctionsServices,
    private _proposalService: ProposalService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.title = 'Propuestas';
    this.proposal = new Proposal('', '', '', '', 0, 0, false, null);
    this.roleEmployee = this._functionsServices.getRole();

    this.getProposals();
  }

  getProposals() {
    const token = this._functionsServices.getToken();

    this._proposalService.getProposals(token).subscribe(
      response => {
        this.proposals = response['proposals'];
      }
    )
  }

  addProposal() {
    const token = this._functionsServices.getToken();

    this._proposalService.createPorposal(this.proposal, token).subscribe(
      response => {
        this.getProposals();
        this.proposal = new Proposal('', '', '', '', 0, 0, false, null);
        $('#addProposal').modal('hide');
        this._toastrService.success('Propuesta añadida correctamente');
      }
    );
  }

  acceptProposal(proposal) {
    let proposalUpdate = proposal;
    proposalUpdate.active = true;
    
    const token = this._functionsServices.getToken();

    this._proposalService.updateProposal(proposalUpdate, token).subscribe(
      response => {
        this._toastrService.success('Propuesta aceptada');
      }
    );
  }

  deleteProposalPrepared(proposal) {
    this.delProposal = proposal;
  }

  deleteProposal(proposalId) {
    const token = this._functionsServices.getToken();

    this._proposalService.deleteProposal(proposalId, token).subscribe(
      response => {
        this._toastrService.warning('Propuesta eliminada.');
        this.getProposals();
      }
    );
  }

  voteProposal(proposal, typeVote) {   
    let proposalUpdate = proposal;
    let employeeId = JSON.parse(this._functionsServices.getIdentity())._id;
    let checkLike = proposalUpdate.employee_actions.includes(employeeId);

    if(checkLike) {
      this._toastrService.warning('Solo puedes votar 1 vez');
    } else {
      proposalUpdate.employee_actions.push( employeeId );

      if(typeVote === "like"){
        proposalUpdate.like ++;
      } else {
        proposalUpdate.dislike ++;
      }

      const token = this._functionsServices.getToken();

      this._proposalService.updateProposal(proposalUpdate, token).subscribe(
        response => {
          this._toastrService.success('Votacion aceptada.');
        }
      );
    }
  }

  dislikeProposal(proposalUpdate) {

  }

}
