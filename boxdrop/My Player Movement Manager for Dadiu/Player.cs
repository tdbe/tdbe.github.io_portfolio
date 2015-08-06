using UnityEngine;
using System.Collections;

/// <summary>
/// The player management - connects to Input, GUI, Animation and Movement.
/// </summary>
public class Player:IPausable
{
	public Inventory PlayerInventory
	{
		get{
			return inventory;	
		}
	}
		
	/// <summary>
	///  
	/// <para>[PlayerMovement]</para>
	/// <para>Fired once the player has started moving.</para>
	/// </summary>
	public delegate void OnPlayerMovementStartDelegate();
	public event OnPlayerMovementStartDelegate OnPlayerMovementStart;
	
	/// <summary>
	///  
	/// <para>[PlayerMovement]</para>
	/// <para>Fired once the player has reached the destination.</para>
	/// </summary>
	public delegate void OnPlayerMovementCompleteDelegate();
	public event OnPlayerMovementCompleteDelegate OnPlayerMovementComplete;
	
	/// <summary>
	/// Callback to get the player position update.
	/// </summary>
	public delegate void OnPlayerPositionUpdateDelegate(Vector3 position);
	public event OnPlayerPositionUpdateDelegate OnPlayerPositionUpdate;
	
	public delegate void OnAnimationEndedDelegate(PlayerAnimator.PlayerAnimation animationFinished);
	public event OnAnimationEndedDelegate OnAnimationEnded;

	[SerializeField]
	private PlayerMovement movement;
	[SerializeField]
	private Inventory inventory;
	[SerializeField]
	private PlayerAnimator animator;
	public PlayerAnimator Animator 
	{
		get
		{
			return animator;
		}
	}
	public Interactable CurrentSelectedInteractable
	{
		get
		{
			return currentSelectedInteractable;
		}
		set
		{
			currentSelectedInteractable = value;
		}
	}
	private Interactable currentSelectedInteractable;
	[SerializeField]
	private PlayerLookScript playerLookScript;

	[SerializeField]
	private ExtendableTrenchcoat exTrench;

	private Vector3 oldpos;
	private float playerVelocity;
	public float PlayerVelocity 
	{
		get
		{
			return playerVelocity;
		}
	}

    void Awake()
    {

    }

	/// <summary>
	/// Custom Start function.
	/// Using Initlialization manager to avoid Unity's random Start() order.
	/// </summary>
    public void Initialize()
    {

        inventory.Initialize();
		movement.Initialize();
		currentSelectedInteractable = null;
		animator.Initialize(this);

		//subscribe to input events for movement
		InputManager.Instance.SetPlayer(this);
        InputManager.Instance.OnTouch += OnTouchHandler;
        InputManager.Instance.OnSwipeStart += OnSwipeStartHandler;
        InputManager.Instance.OnSwipeOngoing += OnSwipeOngoingHandler;
        InputManager.Instance.OnSwipeEnd += OnSwipeEndHandler;

		InputManager.Instance.OnTouchHoldOng += OnTouchHold;

		exTrench.Initialize(this);

		oldpos = transform.position;

		InvokeRepeating("updateVelocity", 0.1f, 0.1f);
    }


	private void updateVelocity()
	{
		playerVelocity = ((transform.position - oldpos) / Time.deltaTime).magnitude;
		oldpos = transform.position;

		/*
		if(playerVelocity > 0 && animator.CurrentAnimation == PlayerAnimator.PlayerAnimation.Idle)
		{
			animator.SwitchAnimation(PlayerAnimator.PlayerAnimation.Walk);
		}
		else if(playerVelocity <= 0 && animator.CurrentAnimation == PlayerAnimator.PlayerAnimation.Walk)
		{
			animator.SwitchAnimation(PlayerAnimator.PlayerAnimation.Idle);
		}
		*/
		//Debug.Log ("player velocity: "+playerVelocity);
	}


	void OnTouchHold(GameObject target, Vector3 touchPt, bool isGUI)
	{
		if (isPaused) 
			return;
		stopMovement();
		OnTouchHandler(target, touchPt, isGUI);
	}
	
	void OnTouchHandler(GameObject target, Vector3 touchPt, bool isGUI)
	{

		if(!isGUI) 
		{
			if(target != null && target.GetComponent(typeof(Interactable)) as Interactable != null) 
			{
				//target.GetComponent<Interactable>().OnTap(this,target,touchPt,isGUI);
				currentSelectedInteractable = getInteractable(target);
				startMovement(target,touchPt,isGUI);

			} 
			else 
			{
				if(exTrench != null)
				{
					exTrench.Deselect(inventory.SelectedItem);
					//exTrench.RestoreIcons();
				}
				inventory.DeselectItem();
				//inventory.RefreshInventory();
				startMovement(target,touchPt,isGUI);
				cleanCurrentSelectedInteractable();
			}
		}
	}
	
	private void startMovement(GameObject target, Vector3 touchPt, bool isGUI) 
	{

		if(movement.MoveToPoint(target,touchPt,isGUI))
		{
			//Debug.Log("Start Movement");
			StartMovement();
			animator.SwitchAnimation(PlayerAnimator.PlayerAnimation.Walk);
		}
	}

	///for Thomas
	public void stopMovement() 
	{
		OnTouchHandler(null, Vector3.zero, false);
		movement.MoveToPoint(gameObject, transform.position, false);
		movement.StopTweenMovement();
	}
	
	public void Move(Interactable iteractable, GameObject target, Vector3 pt, bool isGUI)
	{
		currentSelectedInteractable = iteractable;//only if moving with item "in hand" else default
		startMovement(target, pt, isGUI);		
	}
	
    void OnSwipeStartHandler(GameObject target, Vector3 touchPt, bool isGUI)
    {
        if (isPaused) 
			return;

		//currentSelectedInteractable = getInteractable(target);
		//if(isGUI == false && inventory.SelectedItem == null) { //if I am dragging an icon don't trigger the animation.
		//	animator.SwitchAnimation(PlayerAnimator.PlayerAnimation.Walk);
		//}

		playerLookScript.ForceStopInterval = true;//this is for the head looking
		movement.StartDragging(target, touchPt, isGUI);
        //startMovement(target, touchPt, isGUI);
    }

    void OnSwipeOngoingHandler(GameObject target, Vector3 touchPt, bool isGUI)
    {
		
        if (isPaused) 
			return;

		//if(!movement.DragTarget(target, touchPt, isGUI))
		//	animator.SwitchAnimation(PlayerAnimator.PlayerAnimation.Idle);
    }

    void OnSwipeEndHandler(GameObject target, Vector3 touchPt, bool isGUI)
    {
        if (isPaused) 
			return;
        //currentSelectedInteractable = getInteractable(target);		

		playerLookScript.ForceStopInterval = false;//this is for the head looking
        //movement.EndDragging(target, touchPt, isGUI);
		
    }
	
	/// <summary>
	/// Triggered by the GUI when an item is dropped onto an interactable.
	/// </summary>
	public void OnItemUsed(GameObject target, Item item, Vector3 position) 
	{
		if(isPaused) 
			return;
		inventory.SelectItem(item);		
        currentSelectedInteractable = getInteractable(target);
		currentSelectedInteractable.OnDragFinished(this, position);
	}
	
	
	public void StartMovement()
	{
		if(OnPlayerMovementStart != null)
			OnPlayerMovementStart();	
	}

	public void StartAnimation(PlayerAnimator.PlayerAnimation to) 
	{
		animator.SwitchAnimation(to);
	}

	public void AnimationEnded(PlayerAnimator.PlayerAnimation anim)
	{
		if(OnAnimationEnded != null) 
		{
			OnAnimationEnded(anim);
		}
	}
	
	public void CompleteMovement() 
	{
        //Debug.Log("_____________Movement Complete");
		animator.SwitchAnimation(PlayerAnimator.PlayerAnimation.Idle);
		if(OnPlayerMovementComplete != null) 
		{
			OnPlayerMovementComplete();	
		}
		if(currentSelectedInteractable != null) 
		{
			currentSelectedInteractable.OnPlayerMovementEnd(this);	
			cleanCurrentSelectedInteractable();
		}
	}
	
	
	
	/// <summary>
	/// Callback from the PlayerMovement to trigger the position update
	/// Avoid using it from outside the class pl0x.
	/// </summary>
	/// <param name='position'>
	/// The current position.
	/// </param>
	public void UpdatePosition(Vector3 position)
	{
		if(OnPlayerPositionUpdate != null) 
		{
			OnPlayerPositionUpdate(position);
		}
	}
	
	/// <summary>
	/// Teleports the player to the specified newPosition and newRotation.
	/// </summary>
	public void Teleport(Vector3 newPosition, Quaternion newRotation) 
	{ 
		
		movement.teleportPlayer(newPosition,newRotation);
	}
	
	
	private Interactable getInteractable(GameObject selected) 
	{
		Interactable test = selected ? selected.GetComponent<Interactable>() : null;
		if(test != null) 
		{
			return test;	
		} else 
		{
			return null;	
		}
	}
	
	private void cleanCurrentSelectedInteractable(){
		currentSelectedInteractable = null;	
	}
	

}
